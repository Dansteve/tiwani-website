import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  validateWaitlist,
  mapToSheetRow,
  mapToWaitlistRow,
  WAITLIST_ROLES,
} from "./waitlist";

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("jane.doe@example.com")).toBe(true);
    expect(isValidEmail("a+tag@sub.domain.co.uk")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("jane@")).toBe(false);
    expect(isValidEmail("jane@example")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("jane example.com")).toBe(false);
  });

  it("trims surrounding whitespace before validating", () => {
    expect(isValidEmail("  jane@example.com  ")).toBe(true);
  });
});

describe("validateWaitlist", () => {
  it("passes with a valid email and at least one role", () => {
    const result = validateWaitlist({
      email: "jane@example.com",
      roles: [WAITLIST_ROLES.olderAdult],
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("requires an email", () => {
    const result = validateWaitlist({ email: "  ", roles: [WAITLIST_ROLES.professional] });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe("Email is required");
  });

  it("rejects an invalid email", () => {
    const result = validateWaitlist({ email: "not-an-email", roles: [WAITLIST_ROLES.professional] });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe("Invalid email address");
  });

  it("requires at least one role", () => {
    const result = validateWaitlist({ email: "jane@example.com", roles: [] });
    expect(result.valid).toBe(false);
    expect(result.errors.roles).toBe("Please select at least one option.");
  });

  it("reports both errors when email and roles are both missing", () => {
    const result = validateWaitlist({ email: "", roles: [] });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.roles).toBeDefined();
  });
});

describe("mapToSheetRow", () => {
  it("maps a single role to exactly its column (Yes), the rest No", () => {
    const row = mapToSheetRow({
      email: "jane@example.com",
      roles: [WAITLIST_ROLES.childAdditionalNeeds],
    });
    expect(row).toEqual({
      Email: "jane@example.com",
      Role_Child_AdditionalNeeds: "Yes",
      Role_Older_Adult: "No",
      Role_LongTerm_Condition: "No",
      Role_Professional: "No",
      Created: "x-sheetmonkey-current-date-time",
    });
  });

  it("maps every selected role independently", () => {
    const row = mapToSheetRow({
      email: "carer@example.com",
      roles: [
        WAITLIST_ROLES.olderAdult,
        WAITLIST_ROLES.longTermCondition,
        WAITLIST_ROLES.professional,
      ],
    });
    expect(row.Role_Child_AdditionalNeeds).toBe("No");
    expect(row.Role_Older_Adult).toBe("Yes");
    expect(row.Role_LongTerm_Condition).toBe("Yes");
    expect(row.Role_Professional).toBe("Yes");
  });

  it("maps all four roles to Yes when all are selected", () => {
    const row = mapToSheetRow({
      email: "all@example.com",
      roles: Object.values(WAITLIST_ROLES),
    });
    expect(row.Role_Child_AdditionalNeeds).toBe("Yes");
    expect(row.Role_Older_Adult).toBe("Yes");
    expect(row.Role_LongTerm_Condition).toBe("Yes");
    expect(row.Role_Professional).toBe("Yes");
  });

  it("trims the email when mapping", () => {
    const row = mapToSheetRow({
      email: "  spaced@example.com  ",
      roles: [WAITLIST_ROLES.olderAdult],
    });
    expect(row.Email).toBe("spaced@example.com");
  });

  it("ignores an unrecognised role string", () => {
    const row = mapToSheetRow({
      email: "jane@example.com",
      roles: ["something off-list"],
    });
    expect(row.Role_Child_AdditionalNeeds).toBe("No");
    expect(row.Role_Older_Adult).toBe("No");
    expect(row.Role_LongTerm_Condition).toBe("No");
    expect(row.Role_Professional).toBe("No");
  });
});

describe("mapToWaitlistRow", () => {
  it("maps to the DB shape with the selected contexts and a website source", () => {
    const row = mapToWaitlistRow({
      email: "jane@example.com",
      roles: [WAITLIST_ROLES.childAdditionalNeeds],
    });
    expect(row).toEqual({
      email: "jane@example.com",
      contexts: [WAITLIST_ROLES.childAdditionalNeeds],
      source: "website",
    });
  });

  it("keeps every selected role in the contexts array", () => {
    const row = mapToWaitlistRow({
      email: "carer@example.com",
      roles: [
        WAITLIST_ROLES.olderAdult,
        WAITLIST_ROLES.longTermCondition,
        WAITLIST_ROLES.professional,
      ],
    });
    expect(row.contexts).toEqual([
      WAITLIST_ROLES.olderAdult,
      WAITLIST_ROLES.longTermCondition,
      WAITLIST_ROLES.professional,
    ]);
  });

  it("trims the email", () => {
    const row = mapToWaitlistRow({
      email: "  spaced@example.com  ",
      roles: [WAITLIST_ROLES.olderAdult],
    });
    expect(row.email).toBe("spaced@example.com");
  });

  it("drops an unrecognised role from the contexts array", () => {
    const row = mapToWaitlistRow({
      email: "jane@example.com",
      roles: [WAITLIST_ROLES.professional, "something off-list"],
    });
    expect(row.contexts).toEqual([WAITLIST_ROLES.professional]);
  });

  it("yields an empty contexts array when no known role is selected", () => {
    const row = mapToWaitlistRow({
      email: "jane@example.com",
      roles: ["off-list-only"],
    });
    expect(row.contexts).toEqual([]);
  });
});

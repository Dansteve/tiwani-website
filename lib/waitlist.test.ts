import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  validateWaitlist,
  mapToSheetRow,
  mapToWaitlistRow,
  WAITLIST_ROLES,
} from "./waitlist";

describe("isValidEmail", () => {
  it("accepts ordinary, real-world addresses", () => {
    const valid = [
      "jane.doe@example.com",
      "a+tag@sub.domain.co.uk",
      "first.last@example.org",
      "user_name@example.io",
      "user-name@example-domain.com",
      "x@example.com", // single-char local part
      "name@example.museum", // long TLD
      "1234567890@example.com",
      "carer.123+waitlist@mail.example.co.uk",
      "JANE.DOE@EXAMPLE.COM", // case-insensitive
    ];
    for (const email of valid) {
      expect(isValidEmail(email), `${email} should be valid`).toBe(true);
    }
  });

  it("rejects empty and whitespace-only input", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("   ")).toBe(false);
  });

  it("rejects addresses missing a part or the @", () => {
    expect(isValidEmail("janeexample.com")).toBe(false); // no @
    expect(isValidEmail("jane@")).toBe(false); // no domain
    expect(isValidEmail("@example.com")).toBe(false); // no local part
    expect(isValidEmail("jane@@example.com")).toBe(false); // two @
    expect(isValidEmail("jane@doe@example.com")).toBe(false); // two @
  });

  it("requires a dotted domain with a real TLD", () => {
    expect(isValidEmail("jane@example")).toBe(false); // no dot / TLD
    expect(isValidEmail("jane@localhost")).toBe(false); // no TLD
    expect(isValidEmail("jane@example.c")).toBe(false); // single-char TLD
    expect(isValidEmail("jane@example.123")).toBe(false); // numeric TLD
    expect(isValidEmail("jane@.com")).toBe(false); // empty domain label
    expect(isValidEmail("jane@example.")).toBe(false); // trailing dot, no TLD
  });

  it("rejects whitespace inside the address", () => {
    expect(isValidEmail("jane example.com")).toBe(false);
    expect(isValidEmail("jane @example.com")).toBe(false);
    expect(isValidEmail("jane@ example.com")).toBe(false);
    expect(isValidEmail("jane@exa mple.com")).toBe(false);
    expect(isValidEmail("jane\t@example.com")).toBe(false);
  });

  it("rejects leading, trailing, or consecutive dots", () => {
    expect(isValidEmail(".jane@example.com")).toBe(false);
    expect(isValidEmail("jane.@example.com")).toBe(false);
    expect(isValidEmail("jane..doe@example.com")).toBe(false);
    expect(isValidEmail("jane@example..com")).toBe(false);
    expect(isValidEmail("jane@-example.com")).toBe(false); // leading hyphen label
    expect(isValidEmail("jane@example-.com")).toBe(false); // trailing hyphen label
  });

  it("rejects an address longer than 254 chars or a local part over 64", () => {
    const longLocal = "a".repeat(65);
    expect(isValidEmail(`${longLocal}@example.com`)).toBe(false);
    const longAddress = `${"a".repeat(250)}@example.com`;
    expect(longAddress.length).toBeGreaterThan(254);
    expect(isValidEmail(longAddress)).toBe(false);
  });

  it("trims surrounding whitespace before validating", () => {
    expect(isValidEmail("  jane@example.com  ")).toBe(true);
    expect(isValidEmail("\n jane@example.com \t")).toBe(true);
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

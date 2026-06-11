"use client";

import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  isValidEmail,
  submitWaitlist,
  validateWaitlist,
  WAITLIST_ROLES,
  type WaitlistData,
} from "../lib/waitlist";
import { trackWaitlistConversion } from "../lib/analytics";

// The displayed options come from the same source as the field mappings (lib/waitlist.ts), so the
// form and the DB / sheet mappings cannot drift apart.
const ROLE_OPTIONS = Object.values(WAITLIST_ROLES);

// The waitlist capture form: an email and the four care-context checkboxes. On submit it dual-
// writes to Supabase (primary) and the Google Sheet (secondary) via submitWaitlist, fires the GA
// conversion event on success, and shows a clear success state or a clear error toast. A signup
// that silently fails is the one outcome this path must never produce (HardRules/Website).
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string | undefined>();
  const [rolesError, setRolesError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Returns the same per-field message validateWaitlist would, so the on-blur and on-submit errors
  // read identically. Empty input on blur is left silent (no error until the field has content or
  // the form is submitted), so the user is not scolded for a field they have not finished.
  const emailErrorFor = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    return isValidEmail(trimmed) ? undefined : "Invalid email address";
  };

  const onEmailBlur = () => {
    setEmailError(emailErrorFor(email));
  };

  const toggleRole = (role: string) => {
    setRolesError(undefined);
    setRoles((current) =>
      current.includes(role)
        ? current.filter((r) => r !== role)
        : [...current, role],
    );
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: WaitlistData = { email, roles };
    const { valid, errors } = validateWaitlist(data);
    if (!valid) {
      setEmailError(errors.email);
      setRolesError(errors.roles);
      return;
    }
    setEmailError(undefined);
    setRolesError(undefined);

    setIsLoading(true);
    try {
      await submitWaitlist(data);
      await trackWaitlistConversion(roles.length);
      setIsSubmitted(true);
      toast.success("You are on the list. Thank you for joining.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="size-8 text-success" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-tiwani-dark">
          You are on the list
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Thank you for joining. We will keep you updated as we build toward launching in
          2026, and the first families help shape what we make.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const canSubmit = roles.length > 0 && email.trim().length > 0 && !isLoading;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10"
    >
      <div className="space-y-2.5">
        <Label htmlFor="email" className="text-base text-tiwani-dark">
          Email address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Clear the error as the user corrects it; re-checked on blur and on submit.
            if (emailError) setEmailError(undefined);
          }}
          onBlur={onEmailBlur}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "email-error" : undefined}
          className="h-12 rounded-xl px-4 text-base"
        />
        {emailError && (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {emailError}
          </p>
        )}
      </div>

      <fieldset className="mt-8">
        <legend className="text-base font-medium text-tiwani-dark">
          Who are you coordinating care for?{" "}
          <span className="text-destructive">*</span>
        </legend>
        <p className="mt-1 text-sm text-muted-foreground">Select all that apply.</p>

        <div className="mt-4 grid gap-3">
          {ROLE_OPTIONS.map((role) => {
            const checked = roles.includes(role);
            return (
              <label
                key={role}
                className="flex cursor-pointer items-start gap-3 rounded-xl border bg-background p-4 transition-colors hover:bg-secondary/60"
                style={{
                  borderColor: checked ? "var(--primary)" : "var(--border)",
                  backgroundColor: checked ? "color-mix(in srgb, var(--primary) 5%, var(--card))" : undefined,
                }}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleRole(role)}
                />
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors"
                  style={{
                    borderColor: checked ? "var(--primary)" : "var(--border)",
                    backgroundColor: checked ? "var(--primary)" : "transparent",
                  }}
                >
                  {checked && (
                    <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />
                  )}
                </span>
                <span className="text-base leading-snug text-tiwani-dark">{role}</span>
              </label>
            );
          })}
        </div>
        {rolesError && (
          <p role="alert" className="mt-2 text-sm text-destructive">{rolesError}</p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-destructive text-base font-medium text-destructive-foreground shadow-sm transition-colors hover:bg-tiwani-coral/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:bg-switch-background disabled:text-foreground/60 disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Joining...
          </>
        ) : (
          <>
            Join the waitlist
            <ArrowRight className="size-5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        We collect only your email and care context. No spam, ever.
      </p>
    </form>
  );
}

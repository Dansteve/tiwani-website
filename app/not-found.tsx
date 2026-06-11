import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "./components/Wordmark";

// The branded 404 (Next renders this for any unmatched route and writes it to out/404.html on the
// static export, which Firebase serves for not-found paths). On-brand surfaces come from the
// tokens (cream background, teal foreground, the coral wordmark dot), so it reads as one product.
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center">
          <Wordmark className="text-xl" />
        </div>

        <p className="mt-8 text-7xl font-bold leading-none text-primary">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-tiwani-dark sm:text-3xl">
          This page took a detour
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          The page you are looking for is not here. Let us get you back to where you can
          plan for what matters.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

// Branded 404. On-brand surfaces come from the theme tokens (cream background, teal
// foreground, coral accent on the wordmark dot), so this page reads as one product with
// the rest of the site.
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl tracking-tight font-semibold text-[color:var(--tiwani-dark)]">
            TIWANI
          </span>
          <span className="w-2 h-2 rounded-full bg-[color:var(--tiwani-coral)]" />
        </div>

        <div className="space-y-4">
          <p className="text-7xl font-bold leading-none text-[color:var(--tiwani-primary)]">
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-[color:var(--tiwani-dark)]">
            This page took a detour
          </h1>
          <p className="text-base text-muted-foreground">
            The page you are looking for is not here. Let us get you back to where you can
            plan for what matters.
          </p>
        </div>

        <Link to="/" className="inline-block">
          <Button
            className="rounded-full px-8 py-6 h-auto text-base flex items-center gap-2 bg-[color:var(--tiwani-primary)] text-white hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Back to home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/motion/FadeUp";
import { cn } from "@/utils/cn";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A fully fake mailing-list signup — no backend, no storage. Just a
 * polished demo of the interaction for whenever a real one exists.
 */
export default function MailingListTeaser() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <FadeUp className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 rounded-md border border-cream/10 bg-espresso/40 px-6 py-10 text-center sm:px-10 sm:py-12">
      <h3 className="text-balance font-display text-2xl font-medium leading-tight text-cream sm:text-3xl">
        Be there when
        <br />
        the oven turns on.
      </h3>
      <p className="max-w-sm font-sans text-sm leading-relaxed text-biscuit sm:text-base">
        A tiny note for whenever CRUMB &amp; CHAOS becomes something you can actually walk
        into.
      </p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            role="status"
            className="flex flex-col items-center gap-1.5"
          >
            <p className="font-hand text-2xl text-pistachio">seat hypothetically saved.</p>
            <p className="font-sans text-xs text-biscuit/50">real mailing list coming later.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex w-full max-w-sm flex-col items-center gap-3"
          >
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <label htmlFor="bakehouse-email" className="sr-only">
                Your email
              </label>
              <input
                id="bakehouse-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="your email"
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "bakehouse-email-error" : undefined}
                className={cn(
                  "w-full flex-1 rounded-full border bg-transparent px-5 py-3 font-sans text-sm text-cream placeholder:text-biscuit/40 transition-colors focus-visible:outline-2 focus-visible:outline-caramel",
                  status === "error" ? "border-cherry/50" : "border-cream/20 focus:border-cream/40",
                )}
              />
              <Button type="submit" variant="primary" arrow className="shrink-0">
                Save Me a Seat
              </Button>
            </div>

            <AnimatePresence>
              {status === "error" ? (
                <motion.p
                  id="bakehouse-email-error"
                  role="alert"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-hand text-lg text-cherry"
                >
                  that doesn&apos;t quite look like an email.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </FadeUp>
  );
}

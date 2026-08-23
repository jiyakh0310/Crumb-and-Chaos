import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { recipes } from "@/data/recipes";
import { isEmailServiceConfigured, sendKitchenSOS } from "@/services/emailService";
import { cn } from "@/utils/cn";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 15;
const MESSAGE_MAX = 1200;

const EMPTY_VALUES = {
  name: "",
  email: "",
  recipe: "",
  message: "",
  extra: "",
  imageLink: "",
  website: "", // honeypot — real visitors never see or fill this
};

const labelClass = "font-sans text-xs font-semibold uppercase tracking-[0.18em] text-biscuit/70";
const inputClass =
  "w-full rounded-md border bg-chocolate/40 px-4 py-3 font-sans text-sm text-cream placeholder:text-biscuit/35 transition-colors focus-visible:outline-2 focus-visible:outline-caramel";

function fieldBorder(hasError) {
  return hasError ? "border-cherry/50" : "border-cream/15 focus:border-cream/35";
}

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="font-hand text-base text-cherry sm:text-lg">
      {children}
    </p>
  );
}

export default function KitchenSOSForm() {
  const [searchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const prefilledRecipe = searchParams.get("recipe") ?? "";

  const [values, setValues] = useState({ ...EMPTY_VALUES, recipe: prefilledRecipe });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorReason, setErrorReason] = useState(null); // "not-configured" | "send-failed"
  const panelRef = useRef(null);
  const configured = isEmailServiceConfigured();

  useEffect(() => {
    if (status === "success" || status === "error") {
      panelRef.current?.focus();
    }
  }, [status]);

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "I'll need a name to send the rescue notes to.";
    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = "that email looks a little underbaked.";
    if (!values.recipe.trim()) next.recipe = "which recipe are we rescuing?";
    if (values.message.trim().length < MESSAGE_MIN) next.message = "give me a little more evidence.";
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    // honeypot tripped — pretend everything's fine, send nothing
    if (values.website.trim()) {
      setStatus("success");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    const result = await sendKitchenSOS({
      from_name: values.name.trim(),
      reply_to: values.email.trim(),
      recipe: values.recipe.trim(),
      message: values.message.trim(),
      extra_details: values.extra.trim() || "—",
      image_link: values.imageLink.trim() || "—",
      page_url: window.location.href,
      submitted_at: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    });

    if (result.ok) {
      setErrorReason(null);
      setStatus("success");
    } else {
      setErrorReason(result.reason);
      setStatus("error");
    }
  };

  const retry = () => setStatus("idle");

  const sendAnother = () => {
    setValues({ ...EMPTY_VALUES, recipe: "" });
    setErrors({});
    setErrorReason(null);
    setStatus("idle");
  };

  return (
    <div className="flex flex-col gap-6">
      {!configured ? (
        <div className="rounded-md border border-caramel/25 bg-caramel/[0.06] px-4 py-3 font-sans text-xs leading-relaxed text-biscuit sm:text-sm">
          Kitchen SOS email delivery isn&apos;t connected yet. Add the EmailJS environment
          variables to enable real sending — see <code className="text-caramel">.env.example</code>.
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            ref={panelRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-3 rounded-md border border-pistachio/25 bg-pistachio/[0.05] p-6 outline-none sm:p-8"
          >
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-pistachio">
              SOS Received.
            </span>
            <p className="font-display text-2xl font-medium text-cream sm:text-3xl">
              I&apos;ll investigate this culinary emergency.
            </p>
            <p className="font-hand text-lg text-biscuit/50">your food deserves answers.</p>
            <Button onClick={sendAnother} variant="secondary" arrow className="mt-2">
              Send Another SOS
            </Button>
          </motion.div>
        ) : status === "error" ? (
          <motion.div
            key="error"
            ref={panelRef}
            tabIndex={-1}
            role="alert"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-3 rounded-md border border-cherry/25 bg-cherry/[0.05] p-6 outline-none sm:p-8"
          >
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cherry">
              {errorReason === "not-configured" ? "Not Plugged In Yet." : "Something Got Burnt."}
            </span>
            <p className="font-display text-2xl font-medium text-cream sm:text-3xl">
              {errorReason === "not-configured"
                ? "Kitchen SOS email delivery isn't connected yet."
                : "Your message didn't make it through."}
            </p>
            <p className="font-sans text-sm text-biscuit sm:text-base">
              {errorReason === "not-configured"
                ? "Add the EmailJS environment variables to enable real sending."
                : "Try again — your draft is still right here."}
            </p>
            <Button onClick={retry} variant="secondary" arrow className="mt-2">
              {errorReason === "not-configured" ? "Back to the Form" : "Try Again"}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* honeypot — sr-only's 1px clip keeps this from ever affecting
                page scroll width, unlike a large negative offset would */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="sos-website">Leave this field empty</label>
              <input
                id="sos-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={setField("website")}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="sos-name" className={labelClass}>
                  Name <span className="text-caramel">*</span>
                </label>
                <input
                  id="sos-name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  value={values.name}
                  onChange={setField("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "sos-name-error" : undefined}
                  className={cn(inputClass, fieldBorder(errors.name))}
                />
                <FieldError id="sos-name-error">{errors.name}</FieldError>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="sos-email" className={labelClass}>
                  Email <span className="text-caramel">*</span>
                </label>
                <input
                  id="sos-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  value={values.email}
                  onChange={setField("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "sos-email-error" : undefined}
                  className={cn(inputClass, fieldBorder(errors.email))}
                />
                <FieldError id="sos-email-error">{errors.email}</FieldError>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="sos-recipe" className={labelClass}>
                Recipe <span className="text-caramel">*</span>
              </label>
              <input
                id="sos-recipe"
                type="text"
                list="sos-recipe-options"
                required
                aria-required="true"
                value={values.recipe}
                onChange={setField("recipe")}
                placeholder="e.g. Garlic Focaccia"
                aria-invalid={Boolean(errors.recipe)}
                aria-describedby={errors.recipe ? "sos-recipe-error" : undefined}
                className={cn(inputClass, fieldBorder(errors.recipe))}
              />
              <datalist id="sos-recipe-options">
                {recipes.map((recipe) => (
                  <option key={recipe.slug} value={recipe.title} />
                ))}
              </datalist>
              <FieldError id="sos-recipe-error">{errors.recipe}</FieldError>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="sos-message" className={labelClass}>
                  What went wrong? <span className="text-caramel">*</span>
                </label>
                <span className="font-sans text-xs text-biscuit/40">
                  {values.message.length} / {MESSAGE_MAX}
                </span>
              </div>
              <textarea
                id="sos-message"
                rows={5}
                required
                aria-required="true"
                maxLength={MESSAGE_MAX}
                value={values.message}
                onChange={setField("message")}
                placeholder="Walk me through the crime scene."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "sos-message-error" : undefined}
                className={cn(inputClass, "resize-y", fieldBorder(errors.message))}
              />
              <FieldError id="sos-message-error">{errors.message}</FieldError>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="sos-extra" className={labelClass}>
                Anything else I should know?
              </label>
              <textarea
                id="sos-extra"
                rows={3}
                value={values.extra}
                onChange={setField("extra")}
                placeholder="Optional — altitude, oven quirks, questionable substitutions."
                className={cn(inputClass, "resize-y", fieldBorder(false))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="sos-image" className={labelClass}>
                Image link
              </label>
              <input
                id="sos-image"
                type="text"
                inputMode="url"
                value={values.imageLink}
                onChange={setField("imageLink")}
                placeholder="Optional — paste a link to a photo (uploads aren't supported yet)"
                className={cn(inputClass, fieldBorder(false))}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" arrow disabled={status === "submitting"}>
                {status === "submitting" ? "Sending SOS..." : "Send the SOS"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * True only when all three EmailJS values are present. Never logs
 * their contents — just whether they exist.
 */
export function isEmailServiceConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

/**
 * Sends a Kitchen SOS via EmailJS. Never throws — always resolves
 * to a result object so callers can render a graceful state instead
 * of crashing or falsely claiming success.
 *
 * @param {Record<string, string>} payload - flat template params
 * @returns {Promise<{ ok: true } | { ok: false, reason: "not-configured" | "send-failed" }>}
 */
export async function sendKitchenSOS(payload) {
  if (!isEmailServiceConfigured()) {
    if (import.meta.env.DEV) {
      console.warn(
        "[emailService] Kitchen SOS not sent — EmailJS environment variables are missing. See .env.example.",
      );
    }
    return { ok: false, reason: "not-configured" };
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY);
    return { ok: true };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("[emailService] Kitchen SOS failed to send.", error);
    }
    return { ok: false, reason: "send-failed" };
  }
}

import { resolveSiteConfig } from "./site-config";

export const site = {
  name: "Sinus Companion",
  description:
    "A daily sinusitis companion in development: symptom tracking, treatment reminders, personal patterns, and AI support grounded in your history. Get early access.",
  ...resolveSiteConfig({
    NEXT_PUBLIC_SITE_MODE: process.env.NEXT_PUBLIC_SITE_MODE,
    VERCEL_ENV: process.env.VERCEL_ENV,
    SITE_URL: process.env.SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  }),
  operator: "Leymora Studios",
  contactEmail: "hello@leymora.com",
};

export const faqs = [
  {
    question: "What is Sinus Companion?",
    answer:
      "Sinus Companion is a sinus symptom tracking app in development for people with recurring or chronic sinus symptoms. It connects quick check-ins, treatment logs, local conditions, and personal patterns, with an AI companion designed to answer questions using your own history. Join the waitlist for early access on iOS and Android.",
  },
  {
    question: "How does the daily outlook work?",
    answer:
      "The daily outlook is designed to bring your recent symptom history and morning check-in together with available pollen, air quality, weather, and optional sleep data. Your check-in helps update the picture. It is not an attack prediction; numerical personal forecasts would require validation before release.",
  },
  {
    question: "Can it remind me when to use my medication or nasal spray?",
    answer:
      "Treatment reminders are planned around the medication, spray, or rinse schedule you enter from your existing care plan. Log a use, review your treatment timeline, and optionally record how you felt afterward. The app does not choose medication, set doses, or change your treatment instructions.",
  },
  {
    question: "What makes the AI companion personal?",
    answer:
      "The planned AI companion uses the entries you choose to help answer questions about your own history, such as what changed during a flare or how your recorded sleep compared with your symptoms. Answers should refer back to the relevant records and distinguish a pattern from a proven cause. It is not a clinician and does not diagnose or prescribe.",
  },
  {
    question: "Do I need to log everything every day?",
    answer:
      "No. Start with a quick check-in: clear, my usual, or worse than usual. Add symptoms, treatments, or a flare when useful. Available local conditions can be collected automatically after you choose a location; supported sleep integrations would require your permission. Missing entries stay missing, rather than being counted as symptom-free days.",
  },
  {
    question: "Can Sinus Companion diagnose or treat sinusitis?",
    answer:
      "No. Sinus Companion is designed for personal tracking, education, and understanding your records. It does not diagnose sinusitis, prescribe treatment, or replace professional medical care. Keep following your clinician’s instructions and seek medical advice for persistent or worsening symptoms.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Planned US pricing is Free for core logging, basic reminders, simple trends, and basic export; Premium is planned at $3.99 per month or $29.99 per year for personal pattern reviews, deeper comparisons, AI conversations, tailored reminders, and enhanced reports. Plans may change before launch. Joining the waitlist is free and starts no subscription.",
  },
  {
    question: "Is the app available on iPhone and Android?",
    answer:
      "Sinus Companion is in development for iOS and Android and is not available to download yet. Join the waitlist and choose your device to hear when access opens. The app screens on this website are illustrative previews, not a live medical service.",
  },
  {
    question: "What happens when I join the waitlist?",
    answer:
      "We save your email and preferred platform so we can contact you about access. The waitlist does not collect symptoms or medical records. You can request removal using the form in our privacy notice. Your health history belongs in the app’s separate, consent-based experience when it launches.",
  },
];

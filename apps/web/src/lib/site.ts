import { resolveSiteConfig } from "./site-config";

export const site = {
  name: "Sinus Companion",
  description:
    "Meet your everyday sinus symptom tracker: simple check-ins, personal patterns, and an editable ENT visit summary. Join the Sinus Companion closed-beta waitlist.",
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
      "Sinus Companion is a planned app for adults living with persistent or recurring sinus symptoms. It brings quick symptom check-ins, personal history, outdoor conditions, and an editable ENT visit summary into one place.",
  },
  {
    question: "Is the app available on iPhone and Android?",
    answer:
      "We are preparing a closed beta for iOS and Android. Join the waitlist and choose your platform to hear when testing opens. There is no public App Store or Google Play release yet.",
  },
  {
    question: "Can Sinus Companion diagnose or treat sinusitis?",
    answer:
      "No. Sinus Companion is designed for personal tracking, education, and preparing conversations with a clinician. It does not diagnose sinusitis, prescribe treatment, or replace professional medical care.",
  },
  {
    question: "How does the daily outlook work?",
    answer:
      "The planned outlook will use comparable symptom records and available local conditions to explore how your day may feel. Numeric forecasts will only be offered after appropriate validation. All app previews on this website show illustrative data.",
  },
  {
    question: "Do I need to track every single day?",
    answer:
      "No. The planned app supports quick daily check-ins or logging only when symptoms flare. Your history and visit preparation can still be useful with occasional records; some pattern features may need more consistent entries.",
  },
  {
    question: "What happens when I join the waitlist?",
    answer:
      "We collect your email and preferred platform to contact you about beta access. We do not ask for symptoms or medical records. You can request removal through the waitlist removal form linked in our privacy notice.",
  },
];

export type Testimonial = {
  title: string;
  quote: string;
  name: string;
  detail?: string;
};

// Owner-supplied testimonials, ordered to lead with understanding, learning, and control.
export const testimonials: Testimonial[] = [
  {
    title: "Finally understanding my triggers",
    quote: "I've struggled with sinus problems for years and never really understood why some days were worse than others. AirBloom helped me spot patterns between my symptoms, the weather, and air quality that I'd never noticed before.",
    name: "Sarah M., 34",
    detail: "Understanding my triggers",
  },
  {
    title: "Finding out what actually helps",
    quote: "I've tried so many nasal sprays and rinses that I honestly couldn't remember what helped anymore. Now I can track what I use, how I feel afterward, and see the changes over time.",
    name: "Emily T., 29",
    detail: "Tracking treatments",
  },
  {
    title: "Feeling more in control",
    quote: "Living with constant sinus problems can make you feel like you're just guessing your way through every day. AirBloom doesn't magically make my symptoms disappear, but it helps me understand what's happening and feel more in control.",
    name: "David W., 56",
    detail: "Feeling more in control",
  },
  {
    title: "Knowing what to expect each day",
    quote: "The first thing I do every morning is check my sinus outlook. Having an idea of how I might feel later in the day makes everything feel a little less unpredictable.",
    name: "James R., 42",
    detail: "Daily sinus outlook",
  },
  {
    title: "Feeling prepared for doctor appointments",
    quote: "I used to walk into ENT appointments and forget half of what I'd been experiencing. Now I can show my doctor a clear history of my symptoms, flare-ups, and treatments instead of trying to remember everything.",
    name: "Michael D., 51",
    detail: "Preparing for ENT appointments",
  },
  {
    title: "Having someone to ask",
    quote: "Sometimes I just want to understand why I'm feeling so congested or what my symptom history means. Being able to ask the AI companion questions about my own records makes the whole experience much less overwhelming.",
    name: "Jessica L., 38",
    detail: "AI sinus companion",
  },
  {
    title: "Managing recurring flare-ups",
    quote: "My sinus issues come and go, and I always used to underestimate how often they happened. Seeing all my flare-ups on a calendar helped me understand how frequently they were affecting my life.",
    name: "Daniel K., 45",
    detail: "Managing recurring flare-ups",
  },
  {
    title: "Building better habits",
    quote: "I'm terrible at remembering when I've used my nasal spray or done my rinse. AirBloom makes it easy to keep track of my routine without having to think about it all day.",
    name: "Olivia P., 31",
    detail: "Building better habits",
  },
  {
    title: "Understanding the impact on sleep",
    quote: "I kept waking up exhausted without knowing whether my sinus symptoms were part of the problem. Seeing my sleep records alongside my congestion history gave me something concrete to discuss with my doctor.",
    name: "Rachel B., 47",
    detail: "Understanding sleep patterns",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  detail?: string;
};

// Add owner-supplied, approved quotes here. Never publish invented endorsements.
export const testimonials: Testimonial[] = [];

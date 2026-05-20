export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization?: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

export const testimonials: Testimonial[] = [];
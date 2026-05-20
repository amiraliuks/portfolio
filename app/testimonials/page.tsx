import type { Metadata } from 'next';

import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Feedback and recommendations from collaborators and clients.',
  alternates: {
    canonical: 'https://amiraliu.vercel.app/testimonials',
  },
};

export default function TestimonialsPage() {
  const hasTestimonials = testimonials.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Testimonials</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Feedback from people I have collaborated with across projects, research, and technical
        work.
      </p>

      {!hasTestimonials && (
        <div className="mt-8 rounded-xl border border-border bg-muted/20 p-5 text-sm text-muted-foreground">
          Testimonials are not published yet. For now, the best public references are on my{' '}
          <a
            href="https://www.linkedin.com/in/amiraliu/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            LinkedIn profile
          </a>
          .
        </div>
      )}

      {hasTestimonials && (
        <div className="mt-8 grid gap-4">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="rounded-xl border border-border p-5">
              <blockquote className="text-sm leading-relaxed text-foreground sm:text-base">
                "{testimonial.quote}"
              </blockquote>
              <p className="mt-4 text-sm font-medium text-foreground">
                {testimonial.name}
                <span className="font-normal text-muted-foreground"> - {testimonial.role}</span>
                {testimonial.organization ? (
                  <span className="font-normal text-muted-foreground">
                    {` @ ${testimonial.organization}`}
                  </span>
                ) : null}
              </p>
              {testimonial.sourceLabel && testimonial.sourceUrl ? (
                <a
                  href={testimonial.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex text-xs text-muted-foreground underline underline-offset-4"
                >
                  {testimonial.sourceLabel}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
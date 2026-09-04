export interface Testimonial {
  readonly quote: string
  readonly author: string
  readonly role: string
}

/*
 * Intentionally empty — no invented social proof.
 * Add real testimonials here when available; the section
 * renders nothing while the list is empty.
 */
export const testimonials: readonly Testimonial[] = []

export interface Metric {
  readonly value: string
  readonly label: string
}

/*
 * Only add metrics that are real and verifiable.
 */
export const metrics: readonly Metric[] = []

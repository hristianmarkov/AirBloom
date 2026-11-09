"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import { BrandMark } from "./icons";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ start: true, end: false });

  const updateBounds = useCallback(() => {
    const element = track.current;
    if (!element) return;
    const start = element.scrollLeft <= 2;
    const end = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
    setBounds(previous => previous.start === start && previous.end === end
      ? previous
      : { start, end });
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    updateBounds();
    const observer = new ResizeObserver(updateBounds);
    observer.observe(element);
    return () => observer.disconnect();
  }, [updateBounds]);

  function scroll(direction: -1 | 1) {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  if (!testimonials.length) return null;
  return (
    <section
      className="section community-stories"
      id="testimonials"
      aria-labelledby="stories-title"
      aria-roledescription="carousel"
    >
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <span className="eyebrow">FROM THE AIRBLOOM COMMUNITY</span>
            <h2 id="stories-title">Real people.<br /><em>A little more room for life.</em></h2>
          </div>

        </div>
        <div
          ref={track}
          id="testimonial-track"
          className="community-stories-track"
          tabIndex={0}
          role="group"
          aria-label="Testimonials. Use the left and right arrow keys to browse."
          onScroll={updateBounds}
          onKeyDown={event => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              scroll(event.key === "ArrowLeft" ? -1 : 1);
            } else if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              track.current?.scrollTo({ left: event.key === "Home" ? 0 : track.current.scrollWidth });
            }
          }}
        >
          {testimonials.map((story, index) => (
            <figure
              className="community-story"
              key={story.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${testimonials.length}: ${story.name}`}
            >
              <BrandMark aria-hidden="true" />
              <h3>{story.title}</h3>
              <blockquote>“{story.quote}”</blockquote>
              <figcaption>
                <strong>{story.name}</strong>
                {story.detail && <span>{story.detail}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="community-carousel-footer">

          <div className="community-carousel-controls">
            <button type="button" aria-label="Previous testimonial" aria-controls="testimonial-track" disabled={bounds.start} onClick={() => scroll(-1)}>
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next testimonial" aria-controls="testimonial-track" disabled={bounds.end} onClick={() => scroll(1)}>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

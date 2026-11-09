import { testimonials } from "@/lib/testimonials";
import { BrandMark } from "./icons";

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="section community-stories" id="testimonials" aria-labelledby="stories-title">
      <div className="container">
        <div className="section-heading heading-split">
          <div><span className="eyebrow">FROM THE AIRBLOOM COMMUNITY</span><h2 id="stories-title">Real people.<br /><em>A little more room for life.</em></h2></div>
          <p>Personal experiences from the people who use AirBloom.</p>
        </div>
        <div className="community-stories-grid">
          {testimonials.map((story) => (
            <figure className="community-story" key={`${story.name}-${story.quote}`}>
              <BrandMark aria-hidden="true" />
              <blockquote>{story.quote}</blockquote>
              <figcaption><strong>{story.name}</strong>{story.detail && <span>{story.detail}</span>}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

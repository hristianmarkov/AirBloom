import "./article-art.css";

export function ArticleArt({
  kind,
  className = "",
}: {
  kind: "journal" | "visit" | "conditions" | "routine";
  className?: string;
}) {
  return (
    <div className={`article-art art-${kind} ${className}`} aria-hidden="true">
      {kind === "journal" ? (
        <>
          <div className="art-sun" />
          <div className="art-hill hill-back" />
          <div className="art-hill hill-front" />
          <div className="art-journal">
            <div className="journal-binding" />
            <span>
              THE LITTLE
              <br />
              THINGS,
              <br />
              <em>noticed.</em>
            </span>
            <div className="journal-line" />
            <small>YOUR EVERYDAY COMPANION</small>
          </div>
          <div className="art-leaf leaf-one" />
          <div className="art-leaf leaf-two" />
        </>
      ) : kind === "conditions" ? (
        <>
          <div className="weather-art-orbit" />
          <div className="weather-art-sun" />
          <div className="weather-art-hill" />
          <div className="weather-art-panel">
            <span className="art-mini-label">THE WORLD AROUND YOU</span>
            <strong>A little context.<br /><em>A clearer day.</em></strong>
            <div className="weather-art-readings">
              <span><i className="art-air-lines" />Air quality</span>
              <span><i className="art-pollen-dots" />Pollen</span>
            </div>
            <div className="weather-art-plot"><i /><i /><i /><i /><i /><i /><i /></div>
            <span className="art-mini-label">NOTICE WHAT CHANGES</span>
          </div>
          <div className="weather-art-cloud" />
        </>
      ) : kind === "routine" ? (
        <>
          <div className="routine-art-orbit" />
          <div className="routine-art-leaf" />
          <div className="routine-art-card">
            <span className="art-mini-label">ONE LESS THING TO REMEMBER</span>
            <strong>Your routine.<br /><em>A little easier.</em></strong>
            <div className="routine-art-row"><i className="routine-art-check" /><span>Your morning routine<small>Keep your own plan close</small></span></div>
            <div className="routine-art-row muted"><i className="routine-art-ring" /><span>A moment to check in<small>Your notes, all together</small></span></div>
            <div className="routine-art-footer"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="routine-art-pill"><span /></div>
        </>
      ) : (
        <>
          <div className="art-orbit" />
          <div className="art-paper">
            <span>YOUR NEXT CHAPTER</span>
            <h4>
              A clearer
              <br />
              <em>conversation.</em>
            </h4>
            <div className="art-paper-line" />
            <div className="art-paper-line short" />
            <div className="art-paper-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span>YOUR STORY, IN ONE PLACE</span>
          </div>
          <div className="art-pencil" />
          <div className="art-circle" />
        </>
      )}
    </div>
  );
}

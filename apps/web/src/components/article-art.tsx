export function ArticleArt({
  kind,
  className = "",
}: {
  kind: "journal" | "visit";
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

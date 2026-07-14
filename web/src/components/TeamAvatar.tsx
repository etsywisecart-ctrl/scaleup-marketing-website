"use client";

import { useState } from "react";

/* Circle team avatar. Shows the real photo once it exists at `photo`;
   until then (or if it fails to load) gracefully falls back to a
   gradient monogram so the section always looks intentional. */

export default function TeamAvatar({
  photo,
  name,
  ini,
  accent,
}: {
  photo: string;
  name: string;
  ini: string;
  accent: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="tmava" style={{ "--acc": accent } as React.CSSProperties}>
      <span className="tmring" aria-hidden="true" />
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="tmimg"
          src={photo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="tminit"
          role="img"
          aria-label={name}
          style={{ background: `linear-gradient(145deg, ${accent}, ${accent}CC)` }}
        >
          {ini}
        </span>
      )}
    </span>
  );
}

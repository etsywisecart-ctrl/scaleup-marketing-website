"use client";

import { useState } from "react";

export default function FormatToggle() {
  const [online, setOnline] = useState(true);

  return (
    <div>
      <div className="seg">
        <button className={`segb${online ? " on" : ""}`} onClick={() => setOnline(true)}>
          Live Online
        </button>
        <button className={`segb${online ? "" : " on"}`} onClick={() => setOnline(false)}>
          Lahore Campus
        </button>
      </div>
      <div className="fmtline">
        <span className="fchip">{online ? "EVENING BATCHES · ZOOM LIVE" : "GULBERG III CAMPUS"}</span>
        <span className="fchip">{online ? "RECORDINGS INCLUDED" : "MON–SAT BATCHES"}</span>
        <span className="fchip">{online ? "WEEKLY LIVE Q&A" : "LABS + CO-WORKING"}</span>
      </div>
    </div>
  );
}

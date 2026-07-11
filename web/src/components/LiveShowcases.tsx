/* Animated "live project" showcases for the service pages.
   Pure CSS loops — the .vwin.go / .va animation system from the homepage
   showreel drives the store build; new keyframes drive the rest. */

export function LiveBuildPlayer() {
  return (
    <div className="vwin go">
      <div className="vbar">
        <span className="tl" style={{ background: "#FF5F57" }} />
        <span className="tl" style={{ background: "#FEBC2E" }} />
        <span className="tl" style={{ background: "#28C840" }} />
        <span className="vurl">aurelia-skin.myshopify.com — rebuilding live…</span>
      </div>
      <div className="vbody" style={{ cursor: "default" }}>
        <div className="vstore">
          <div className="vsnav va">
            <span className="vsnavbrand">
              <span className="ddot" style={{ width: 12, height: 12 }} />
              <span className="vsb">AURELIA SKIN</span>
            </span>
            <span className="vslinks">Shop&nbsp;&nbsp;&nbsp;Bestsellers&nbsp;&nbsp;&nbsp;About</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0E2A38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8h12l-1.2 12H7.2L6 8Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
          </div>
          <div className="vshero va">
            <div className="vsh1">Glow, naturally.</div>
            <div className="vsh2">Clean skincare, shipped nationwide in 48h</div>
            <span className="vsbtn">Shop now</span>
          </div>
          <div className="vsprods">
            <div className="vsp va aC1">
              <div className="vsimg g1" />
              <div className="vspn">Vitamin C Serum</div>
              <div className="vspp">
                $43.00<span className="vsbuy">Buy</span>
              </div>
            </div>
            <div className="vsp va aC2">
              <div className="vsimg g2" />
              <div className="vspn">Night Repair Set</div>
              <div className="vspp">$129.00</div>
            </div>
            <div className="vsp va aC3">
              <div className="vsimg g3" />
              <div className="vspn">Rose Cleanser</div>
              <div className="vspp">$24.50</div>
            </div>
          </div>
          <div className="vschips">
            <span className="vsc va aCh1">✓ Shipping zones set</span>
            <span className="vsc va aCh2">✓ Payments: Cards + COD</span>
            <span className="vsc pix va aCh3">● Meta Pixel live</span>
          </div>
          <div className="vstoast va">✓ Test order #1001 — Vitamin C Serum · $43.00 paid</div>
          <svg className="vscur va" viewBox="0 0 20 20">
            <path d="M3 1.5 15.5 13l-5.8.9L12.6 20l-3 1.2-2.8-6L3 18.5Z" fill="#0E2A38" stroke="#fff" strokeWidth="1.4" />
          </svg>
        </div>
        <span className="vtag">LIVE PREVIEW · REAL CLIENT PROJECT</span>
        <div className="vprog">
          <div className="vprogf va" />
        </div>
      </div>
    </div>
  );
}

const ORDERS = [
  { no: "#1138", item: "2× Vitamin C Serum", city: "Lahore", amt: "PKR 7,960" },
  { no: "#1139", item: "Night Repair Set", city: "Karachi", amt: "PKR 11,890" },
  { no: "#1140", item: "Rose Cleanser + Serum", city: "Islamabad", amt: "PKR 6,240" },
  { no: "#1141", item: "3× Night Repair Set", city: "Faisalabad", amt: "PKR 35,670" },
];

export function LiveOrderFeed() {
  return (
    <div className="lof rv">
      <div className="lofhead">
        <span className="lofdot" />
        <span className="loftitle">Live order feed</span>
        <span className="loftag">store ops · real client</span>
      </div>
      {ORDERS.map((o, i) => (
        <div key={o.no} className="lorow" style={{ animationDelay: `${i * 2.6}s` }}>
          <span className="lono">{o.no}</span>
          <span className="loitem">
            {o.item}
            <span className="locity"> · {o.city}</span>
          </span>
          <span className="loamt">{o.amt}</span>
          <span className="lopaid">PAID</span>
        </div>
      ))}
      <div className="loftotal">
        <span>Today</span>
        <div className="lobar">
          <div className="lofill" />
        </div>
        <span className="lotv">PKR 231K · 47 orders</span>
      </div>
    </div>
  );
}

export function LiveCodeTyping() {
  return (
    <div className="mkframe" style={{ marginTop: 0 }}>
      <div className="mkbar">
        <span className="mkdot mkdotr" />
        <span className="mkdot mkdoty" />
        <span className="mkdot mkdotg" />
        <span className="mkurl">rgm-stone / dashboard.tsx — deploying to production…</span>
      </div>
      <div className="mkcode tycode">
        <div className="tyline" style={{ animationDelay: "0s" }}>
          <span className="c-key">const</span> <span className="c-fn">pipeline</span> = <span className="c-key">await</span> <span className="c-fn">getJobs</span>(<span className="c-str">&quot;factory&quot;</span>)
        </div>
        <div className="tyline" style={{ animationDelay: "1.1s" }}>
          <span className="c-key">const</span> <span className="c-fn">alerts</span> = pipeline.<span className="c-fn">filter</span>(j =&gt; j.<span className="c-fn">blocked</span>)
        </div>
        <div className="tyline" style={{ animationDelay: "2.2s" }}>
          <span className="c-key">return</span> &lt;<span className="c-tag">Dashboard</span> <span className="c-fn">jobs</span>={"{pipeline}"} /&gt;
        </div>
        <div className="tyline" style={{ animationDelay: "3.3s" }}>
          <span className="c-mut">✓ build passed · deployed in 42s</span>
          <span className="tycaret" />
        </div>
      </div>
    </div>
  );
}

export function LiveMetricBoard() {
  return (
    <div className="mkframe" style={{ marginTop: 0 }}>
      <div className="mkbar">
        <span className="mkdot mkdotr" />
        <span className="mkdot mkdoty" />
        <span className="mkdot mkdotg" />
        <span className="mkurl">app.rgmstone.io — live production metrics</span>
      </div>
      <div className="mkdash">
        <div className="mkrail">
          <span className="mkraildot" />
          <span className="mkrailitem on" />
          <span className="mkrailitem" />
          <span className="mkrailitem" />
          <span className="mkrailitem" />
        </div>
        <div className="mkdashmain">
          <div className="mkdtiles">
            <div className="mkdtile">
              <div className="mkdval" style={{ color: "#3B5BDB" }}>£7k</div>
              <div className="mkdlabel">Pipeline value</div>
            </div>
            <div className="mkdtile">
              <div className="mkdval" style={{ color: "#12805A" }}>128</div>
              <div className="mkdlabel">Jobs live</div>
            </div>
            <div className="mkdtile">
              <div className="mkdval lpulse" style={{ color: "#B26A00" }}>8</div>
              <div className="mkdlabel">Open alerts</div>
            </div>
            <div className="mkdtile">
              <div className="mkdval" style={{ color: "#0E2A38" }}>99.9%</div>
              <div className="mkdlabel">Uptime</div>
            </div>
          </div>
          <div className="mkbars lbars">
            <i style={{ height: "40%", animationDelay: "0s" }} />
            <i style={{ height: "58%", animationDelay: "-.6s" }} />
            <i style={{ height: "48%", animationDelay: "-1.2s" }} />
            <i style={{ height: "72%", animationDelay: "-1.8s" }} />
            <i style={{ height: "64%", animationDelay: "-2.4s" }} />
            <i style={{ height: "88%", animationDelay: "-3s" }} />
            <i style={{ height: "100%", animationDelay: "-3.6s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

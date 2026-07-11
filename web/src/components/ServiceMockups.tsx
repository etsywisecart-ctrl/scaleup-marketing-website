/* Custom, colorful CSS/SVG mockups — one tailored to each service.
   All hand-drawn with divs + inline SVG, no images. */

function Bar({ url }: { url: string }) {
  return (
    <div className="mkbar">
      <span className="mkdot mkdotr" />
      <span className="mkdot mkdoty" />
      <span className="mkdot mkdotg" />
      <span className="mkurl">{url}</span>
    </div>
  );
}

/* Ecommerce — a live storefront */
export function StoreMock() {
  return (
    <div className="mk mkframe">
      <Bar url="aurelia-skin.com" />
      <div className="mkstore">
        <div className="mkstoretop">
          <span className="mkstorelogo">AURELIA</span>
          <span className="mkstorenav">Shop · New · About</span>
          <span className="mkcart">Cart · 2</span>
        </div>
        <div className="mkhero">
          <div>
            <div className="mkherotitle">Glow, naturally.</div>
            <div className="mkherosub">Clean skincare · shipped in 48h</div>
          </div>
          <span className="mkherobtn">Shop now</span>
        </div>
        <div className="mkgrid3">
          <div className="mkprod">
            <div className="mkpimg g-rose" />
            <div className="mkpname">Vitamin C Serum</div>
            <div className="mkprow"><span className="mkprice">$43</span><span className="mkbuy">Buy</span></div>
          </div>
          <div className="mkprod">
            <div className="mkpimg g-navy" />
            <div className="mkpname">Night Repair</div>
            <div className="mkprow"><span className="mkprice">$129</span><span className="mkbuy">Buy</span></div>
          </div>
          <div className="mkprod">
            <div className="mkpimg g-pink" />
            <div className="mkpname">Rose Cleanser</div>
            <div className="mkprow"><span className="mkprice">$24</span><span className="mkbuy">Buy</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* SaaS — a product dashboard */
export function DashMock() {
  return (
    <div className="mk mkframe">
      <Bar url="app.rgmstone.io" />
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
            <div className="mkdtile"><div className="mkdval" style={{ color: "#3B5BDB" }}>£7k</div><div className="mkdlabel">Pipeline</div></div>
            <div className="mkdtile"><div className="mkdval" style={{ color: "#12805A" }}>128</div><div className="mkdlabel">Jobs live</div></div>
            <div className="mkdtile"><div className="mkdval" style={{ color: "#B26A00" }}>8</div><div className="mkdlabel">Alerts</div></div>
            <div className="mkdtile"><div className="mkdval" style={{ color: "#0E2A38" }}>99%</div><div className="mkdlabel">Uptime</div></div>
          </div>
          <div className="mkbars">
            <i style={{ height: "40%" }} /><i style={{ height: "58%" }} /><i style={{ height: "48%" }} />
            <i style={{ height: "72%" }} /><i style={{ height: "64%" }} /><i style={{ height: "88%" }} /><i style={{ height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Web Development — a code editor */
export function CodeMock() {
  return (
    <div className="mk mkframe">
      <Bar url="page.tsx" />
      <div className="mkcode">
        <div className="ln"><span className="c-mut">1</span> <span className="c-key">export default</span> <span className="c-key">function</span> <span className="c-fn">Page</span>() {"{"}</div>
        <div className="ln"><span className="c-mut">2</span>   <span className="c-key">return</span> (</div>
        <div className="ln"><span className="c-mut">3</span>     &lt;<span className="c-tag">main</span> <span className="c-fn">className</span>=<span className="c-str">&quot;hero&quot;</span>&gt;</div>
        <div className="ln"><span className="c-mut">4</span>       &lt;<span className="c-tag">h1</span>&gt;<span className="c-str">Build. Scale.</span>&lt;/<span className="c-tag">h1</span>&gt;</div>
        <div className="ln"><span className="c-mut">5</span>     &lt;/<span className="c-tag">main</span>&gt;</div>
        <div className="ln"><span className="c-mut">6</span>   )</div>
        <div className="ln"><span className="c-mut">7</span> {"}"}</div>
      </div>
    </div>
  );
}

/* Mobile App — a phone */
export function PhoneMock() {
  return (
    <div className="mkphonewrap">
      <div className="mkphone">
        <div className="mkphonescreen">
          <div className="mkapph">Good morning</div>
          <div className="mkappsub">Ayesha · Premium</div>
          <div className="mkbalance">
            <div className="mkballabel">Balance</div>
            <div className="mkbalval">$4,820</div>
          </div>
          <div className="mkapprow">
            <span className="mkappic" />
            <span className="mkappbars"><span className="mkappbar" /><span className="mkappbar s" /></span>
          </div>
          <div className="mkapprow">
            <span className="mkappic" />
            <span className="mkappbars"><span className="mkappbar" /><span className="mkappbar s" /></span>
          </div>
          <div className="mktabbar">
            <span className="mktab on" /><span className="mktab" /><span className="mktab" /><span className="mktab" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* CRM / ERP — a kanban board */
export function KanbanMock() {
  return (
    <div className="mk mkkanban">
      <div className="mkcol">
        <span className="mkcolh amber">Leads</span>
        <div className="mkkcard"><span className="mkkline" /><span className="mkkline s" /><span className="mkkpill" style={{ background: "#F5A623" }} /></div>
        <div className="mkkcard"><span className="mkkline" /><span className="mkkline s" /></div>
      </div>
      <div className="mkcol">
        <span className="mkcolh blue">Active</span>
        <div className="mkkcard"><span className="mkkline" /><span className="mkkline s" /><span className="mkkpill" style={{ background: "#2F6BD8" }} /></div>
      </div>
      <div className="mkcol">
        <span className="mkcolh green">Won</span>
        <div className="mkkcard"><span className="mkkline" /><span className="mkkline s" /><span className="mkkpill" style={{ background: "#12805A" }} /></div>
      </div>
    </div>
  );
}

/* UI / UX Design — a design canvas */
export function DesignMock() {
  return (
    <div className="mk mkdesign">
      <div className="mkswatch">
        <i style={{ background: "#0E3B52" }} />
        <i style={{ background: "#2FBF9E" }} />
        <i style={{ background: "#E5427E" }} />
        <i style={{ background: "#F5A623" }} />
        <i style={{ background: "#6D4FE0" }} />
      </div>
      <div className="mkuibtns">
        <span className="mkuibtn">Primary</span>
        <span className="mkuibtn ghost">Ghost</span>
      </div>
      <div className="mktextlines">
        <i /><i style={{ width: "80%" }} /><i style={{ width: "55%" }} />
      </div>
    </div>
  );
}

/* Digital Marketing — an ad performance chart */
export function AdsMock() {
  return (
    <div className="mk mkads">
      <div className="mkadstop">
        <span className="mkadslabel">ROAS</span>
        <span className="mkadsval">6.2×</span>
        <span className="mkadsup">▲ 11.11 campaign</span>
      </div>
      <svg className="mkadschart" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="adsg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F2A65A" stopOpacity="0.45" />
            <stop offset="1" stopColor="#F2A65A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,34 L14,30 L28,31 L42,22 L56,24 L70,14 L84,12 L100,4 L100,40 L0,40 Z" fill="url(#adsg)" />
        <polyline points="0,34 14,30 28,31 42,22 56,24 70,14 84,12 100,4" fill="none" stroke="#E8622A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="mkadschips">
        <span className="mkadschip">Meta</span>
        <span className="mkadschip">TikTok</span>
        <span className="mkadschip">Google</span>
      </div>
    </div>
  );
}

/* Business Consulting — a growth plan */
export function GrowthMock() {
  return (
    <div className="mk mkgrowth">
      <div className="mkgtop">
        <span className="mkglabel">Revenue plan</span>
        <span className="mkgup">▲ 3.2×</span>
      </div>
      <div className="mkgbars">
        <i style={{ height: "28%" }} /><i style={{ height: "40%" }} /><i style={{ height: "36%" }} />
        <i style={{ height: "58%" }} /><i style={{ height: "74%" }} /><i style={{ height: "100%" }} />
      </div>
      <div className="mkgaxis"><span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span><span>Q5</span><span>Q6</span></div>
    </div>
  );
}

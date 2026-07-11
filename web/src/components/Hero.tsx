import PlatformLogos from "./PlatformLogos";
import HeroPromo from "./HeroPromo";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="gridbg" />
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="wrap">
        <div className="herogrid">
          <div className="rv heroleft">
            <span
              className="chip mono"
              style={{ background: "#fff", borderColor: "#CBE8DF", color: "#14806F", fontSize: 11, letterSpacing: ".14em" }}
            >
              DIGITAL AGENCY × TRAINING ACADEMY
            </span>
            <h1 className="h1">
              Build. Automate.
              <br />
              <span className="grad">Scale.</span>
            </h1>
            <p className="hsub">
              We engineer digital businesses through Ecommerce, AI, Software, and Growth Strategy —
              and train the next generation of digital entrepreneurs.
            </p>
            <div className="hcta">
              <a className="btn btnG" href="#contact">
                Book a Strategy Call
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a className="btn btnO" href="#services">
                Explore Solutions
              </a>
            </div>
            <div className="hnote">
              <span className="dot" />
              Learn. Launch. Scale. — free consultation, no retainer required
            </div>
          </div>
          <HeroPromo />
        </div>
      </div>
      <div className="stats rv">
        <div className="wrap strip">
          <div className="stat first">
            <div className="num" data-to="500" data-suf="+">
              500+
            </div>
            <div className="slab">Students trained</div>
          </div>
          <div className="stat nb">
            <div className="num" data-to="100" data-suf="+">
              100+
            </div>
            <div className="slab">Projects delivered</div>
          </div>
          <div className="stat">
            <div className="num" data-pre="$" data-to="12" data-suf="M+">
              $12M+
            </div>
            <div className="slab">Client revenue tracked</div>
          </div>
          <div className="stat">
            <div className="num" data-to="8" data-suf="">
              8
            </div>
            <div className="slab">Years shipping &amp; teaching</div>
          </div>
        </div>
      </div>
      <div className="mqlab">Platforms we build on, sell on, and teach</div>
      <div className="mq">
        <div className="mqt">
          <PlatformLogos />
          <PlatformLogos />
        </div>
      </div>
    </section>
  );
}

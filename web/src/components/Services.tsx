import Link from "next/link";
import { coreServices, orbitalServices } from "@/data/content";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export default function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="rv" style={{ maxWidth: 660 }}>
          <p className="eyebrow">Agency — what we build</p>
          <h2 className="h2">
            A full product team, <span className="grad">on demand.</span>
          </h2>
          <p className="lead" style={{ marginTop: 20 }}>
            Nine capabilities, one accountable partner — from your first store to your own SaaS
            platform.
          </p>
        </div>

        <div className="orbit rv">
          <div className="oc oc1" />
          <div className="oc oc2" />
          <div className="oax" />
          <span className="oaxl" style={{ left: 0 }}>
            <span>Commerce</span>
            <span className="oaxd" />
          </span>
          <span className="oaxl" style={{ right: 0 }}>
            <span className="oaxd" />
            <span>Software</span>
          </span>
          <div className="omast">
            Mastery
            <br />
            Area
          </div>
          {coreServices.map((s, i) => (
            <div key={s.t} className="opos" style={{ left: s.x + "%", top: s.y + "%" }}>
              <div className="obob" style={{ animationDelay: -i * 0.7 + "s" }}>
                <div className="opill">
                  <span className="oico" style={{ background: s.c, borderRadius: s.r }} />
                  {s.t}
                </div>
              </div>
            </div>
          ))}
          {orbitalServices.map((s, i) => (
            <div key={s.t} className="opos" style={{ left: s.x + "%", top: s.y + "%" }}>
              <div className="obob" style={{ animationDelay: -i * 0.9 - 0.4 + "s" }}>
                <span className="ofaint">{s.t}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bento">
          <div className="bcard b7 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <path d="M6 8h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 8Z" />
                <path d="M9 10V6a3 3 0 0 1 6 0v4" />
              </Icon>
            </div>
            <h3 className="bt">Ecommerce Development</h3>
            <p className="bs">
              Shopify, WooCommerce &amp; custom storefronts engineered to convert — theme speed,
              checkout flow, and the ops behind them.
            </p>
            <div className="chips">
              <span className="chip">Shopify Plus</span>
              <span className="chip">WooCommerce</span>
              <span className="chip">Daraz Seller</span>
              <span className="chip">Headless</span>
            </div>
            <div className="fstat">Real client results — gross sales +322% YoY · orders +287%</div>
            <Link className="clink" href="/services/ecommerce" style={{ paddingTop: 16 }}>
              Explore Ecommerce Development →
            </Link>
          </div>

          <div className="bcard b5 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                <circle cx="12" cy="12" r="4" />
              </Icon>
            </div>
            <h3 className="bt">AI Automation</h3>
            <p className="bs">
              Workflows that answer, tag, route, and follow up — so revenue ops run while you
              sleep.
            </p>
            <div className="chips">
              <span className="chip">n8n</span>
              <span className="chip">OpenAI</span>
              <span className="chip">WhatsApp API</span>
            </div>
            <div className="flow">
              <div className="fnode">
                <span className="fdot pulse" />
                New order — Daraz store
                <span className="ftag">TRIGGER</span>
              </div>
              <div className="fline" />
              <div className="fnode">
                <span className="fdot" />
                AI tags customer intent &amp; value
                <span className="ftag">GPT-4o</span>
              </div>
              <div className="fline" />
              <div className="fnode">
                <span className="fdot" />
                VIP → WhatsApp voucher · else e-receipt
                <span className="ftag">BRANCH</span>
              </div>
            </div>
            <div className="fstat">Ran 1,284× this week · 99.2% success · 0 human minutes</div>
          </div>

          <div className="bcard b5 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                <path d="m5.5 11.6-2.5 1.4 9 5 9-5-2.5-1.4" />
              </Icon>
            </div>
            <h3 className="bt">SaaS Product Development</h3>
            <p className="bs">
              MVP to full launch — auth, billing, cloud infra, and the dashboard your users log
              into.
            </p>
            <div className="chips">
              <span className="chip">MVP in 8–12 wks</span>
              <span className="chip">Stripe billing</span>
              <span className="chip">AWS</span>
            </div>
            <div className="fstat">RGM Stone Workflow OS — live in production, built &amp; delivered by ScaleUp</div>
            <Link className="clink" href="/services/software-development" style={{ paddingTop: 16 }}>
              Explore Web, SaaS &amp; App Development →
            </Link>
          </div>

          <div className="bcard b4 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
              </Icon>
            </div>
            <h3 className="bt">Web Development</h3>
            <p className="bs">Business sites and web platforms that load fast and rank — built on modern stacks.</p>
            <div className="chips">
              <span className="chip">React</span>
              <span className="chip">Next.js</span>
              <span className="chip">Laravel</span>
            </div>
            <Link className="clink" href="/services/software-development" style={{ marginTop: "auto", paddingTop: 16 }}>
              Learn more →
            </Link>
          </div>

          <div className="bcard b4 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <rect x="7" y="3" width="10" height="18" rx="2.5" />
                <path d="M11 17.5h2" />
              </Icon>
            </div>
            <h3 className="bt">Mobile App Development</h3>
            <p className="bs">iOS &amp; Android from one codebase — commerce apps, booking apps, internal tools.</p>
            <div className="chips">
              <span className="chip">Flutter</span>
              <span className="chip">React Native</span>
            </div>
            <Link className="clink" href="/services/software-development" style={{ marginTop: "auto", paddingTop: 16 }}>
              Learn more →
            </Link>
          </div>

          <div className="bcard b4 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
              </Icon>
            </div>
            <h3 className="bt">CRM / ERP Solutions</h3>
            <p className="bs">Sales pipelines, inventory, HR, and accounts — one source of truth for the whole business.</p>
            <div className="chips">
              <span className="chip">Odoo</span>
              <span className="chip">Custom</span>
              <span className="chip">Zoho</span>
            </div>
          </div>

          <div className="bcard b4 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <path d="m12 19 7-7-3-3-7 7-1.2 4.2L12 19Z" />
                <path d="m14 8 3 3M5 21h3" />
              </Icon>
            </div>
            <h3 className="bt">UI / UX Design</h3>
            <p className="bs">Research, flows, and interfaces that make complex products feel obvious.</p>
            <div className="chips">
              <span className="chip">Design systems</span>
              <span className="chip">Prototyping</span>
            </div>
          </div>

          <div className="bcard b4 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <path d="M3 17l6-6 4 4 8-9" />
                <path d="M21 6v5h-5" />
              </Icon>
            </div>
            <h3 className="bt">Digital Marketing</h3>
            <p className="bs">Performance ads, funnels, and retention flows measured on revenue — not likes.</p>
            <div className="chips">
              <span className="chip">Meta</span>
              <span className="chip">TikTok</span>
              <span className="chip">ROAS 4.6× avg</span>
            </div>
          </div>

          <div className="bcard b4 rv">
            <div className="glt" />
            <div className="bic">
              <Icon>
                <circle cx="12" cy="12" r="9" />
                <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
              </Icon>
            </div>
            <h3 className="bt">Business Consulting</h3>
            <p className="bs">Pricing, positioning, and digital roadmaps before a single line of code is written.</p>
            <div className="chips">
              <span className="chip">Free first session</span>
            </div>
          </div>
        </div>

        <div className="secta rv">
          <a className="btn btnG" href="#contact">
            Book a free scoping call
          </a>
          <span className="softline">Not sure which service fits? That is exactly what the call is for.</span>
        </div>
      </div>
    </section>
  );
}

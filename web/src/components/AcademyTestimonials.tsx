"use client";

import { useEffect, useState } from "react";

type Student = { name:string; role:string; platform:string; metric:string; quote:string; avatar:string; accent:string };

const students: Student[] = [
 {name:"Areeba K.",role:"Etsy Seller",platform:"ETSY",metric:"$1K+ MONTH · 312 SALES",quote:"I joined the free demo class fully skeptical. Eight weeks later I had my first international order. The mentors sell on these platforms daily — it shows.",avatar:"AK",accent:"mint"},
 {name:"Bilal Ahmed",role:"eBay Seller",platform:"EBAY",metric:"FIRST INTL ORDER · DAY 54",quote:"The practical approach changed everything for me. I built my listings step by step and finally understood how to operate an international marketplace account.",avatar:"BA",accent:"blue"},
 {name:"Sara Khan",role:"Etsy Seller",platform:"ETSY",metric:"$500+ FIRST MONTH",quote:"The academy gave me a clear process instead of random tutorials. I finally knew what to build first, what to test and what to improve.",avatar:"SK",accent:"violet"},
 {name:"Ahmed Raza",role:"Shopify Store Owner",platform:"SHOPIFY",metric:"LIVE STORE · 3 WEEKS",quote:"The best part was building while learning. Every class ended with something working on my own store, so the course never felt disconnected from real business.",avatar:"AR",accent:"orange"},
 {name:"Nadia Fatima",role:"Amazon Seller",platform:"AMAZON",metric:"FIRST PRODUCT LIVE",quote:"The sessions made marketplace setup feel manageable. The checklists and mentor feedback helped me move from watching tutorials to actually launching.",avatar:"NF",accent:"pink"}
];

export default function AcademyTestimonials(){
 const [active,setActive]=useState(0);
 useEffect(()=>{const id=window.setInterval(()=>setActive(v=>(v+1)%students.length),5000);return()=>window.clearInterval(id)},[]);
 const go=(d:number)=>setActive(v=>(v+d+students.length)%students.length);
 return <section className="academy-testimonials-section" id="student-stories">
  <div className="wrap">
   <div className="academy-testimonials-head rv">
    <div><span className="eyebrow"><i className="dot"/>Student testimonials</span><h2 className="h2">Students who <span className="accent">shipped.</span></h2><p>Real learning stories from the Academy — each student's result and testimonial stay together.</p></div>
    <div className="academy-rating"><div className="rating-avatars">{students.slice(0,4).map(s=><span key={s.name}>{s.avatar}</span>)}</div><div><strong>4.9/5</strong><small>student experience</small></div></div>
   </div>
   <div className="academy-carousel" aria-roledescription="carousel" aria-label="Student testimonials">
    <button className="academy-carousel-arrow prev" onClick={()=>go(-1)} aria-label="Previous testimonial">←</button>
    <div className="academy-carousel-viewport"><div className="academy-carousel-track" style={{transform:"translateX(calc(-"+active+" * (100% + 18px)))"}}>
      {students.map((s,i)=><article className={"academy-student-card "+s.accent+(i===active?" is-active":"")} key={s.name}>
       <div className="student-card-top"><span className="student-platform">{s.platform}</span><span className="student-stars">★★★★★</span></div>
       <div className="student-profile"><div className="student-avatar">{s.avatar}</div><div><h3>{s.name}</h3><p>{s.role}</p></div></div>
       <div className="student-metric">{s.metric}</div>
       <blockquote>“{s.quote}”</blockquote>
       <div className="student-card-bottom"><span>ScaleUp Academy</span><span className="student-verified">✓ Student story</span></div>
      </article>)}
    </div></div>
    <button className="academy-carousel-arrow next" onClick={()=>go(1)} aria-label="Next testimonial">→</button>
   </div>
   <div className="academy-carousel-controls"><div className="academy-carousel-dots">{students.map((s,i)=><button key={s.name} className={i===active?"active":""} onClick={()=>setActive(i)} aria-label={"Show testimonial from "+s.name}/>)}</div><div className="academy-carousel-progress"><span style={{width:((active+1)/students.length)*100+"%"}}/></div><span className="academy-carousel-count">{String(active+1).padStart(2,"0")} / {String(students.length).padStart(2,"0")}</span></div>
   <div className="academy-student-stats"><div><strong>500+</strong><span>Students trained</span></div><i/><div><strong>5</strong><span>Practical tracks</span></div><i/><div><strong>1:1</strong><span>Mentor support</span></div><i/><div><strong>3 days</strong><span>Free demo</span></div></div>
  </div>
 </section>
}
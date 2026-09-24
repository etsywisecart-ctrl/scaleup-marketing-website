import Link from "next/link";

const menu = [
  { name: "Truffle Mushroom Pasta", desc: "Tagliatelle, wild mushrooms, parmesan, herbs", price: "$18", emoji: "🍝" },
  { name: "Smoky Chicken Burger", desc: "Grilled chicken, smoked cheddar, house sauce", price: "$15", emoji: "🍔" },
  { name: "Burrata Garden Salad", desc: "Burrata, tomatoes, basil oil, toasted seeds", price: "$14", emoji: "🥗" },
  { name: "Fire-Roasted Salmon", desc: "Salmon, lemon butter, greens, roasted potatoes", price: "$24", emoji: "🐟" },
];

export default function RestaurantDemo() {
  return (
    <main className="demo-restaurant">
      <nav className="demo-nav"><Link href="/" className="demo-brand">SAVORA<span>•</span></Link><div className="demo-navlinks"><a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#contact">Contact</a></div><a href="#menu" className="demo-dark-btn">Order online →</a></nav>
      <section className="restaurant-hero"><div className="restaurant-copy"><span className="demo-kicker">MODERN KITCHEN · EST. 2018</span><h1>Good food.<br /><em>Good mood.</em></h1><p>A warm, modern restaurant built around seasonal ingredients, bold flavours and food worth sharing.</p><div className="demo-actions"><a href="#menu" className="demo-dark-btn">Explore the menu</a><a href="#story" className="demo-text-btn">Our story ↗</a></div><div className="demo-rating"><b>★★★★★</b><span>4.9 from 2,400+ guests</span></div></div><div className="restaurant-visual"><div className="plate">🍝</div><div className="visual-note note-one">Fresh daily<br /><b>Farm to table</b></div><div className="visual-note note-two">Chef's pick<br /><b>Tonight's special</b></div></div></section>
      <section id="menu" className="restaurant-menu"><div className="demo-section-head"><span className="demo-kicker">FROM THE KITCHEN</span><h2>Made to be <em>remembered.</em></h2><p>Simple ingredients. Serious flavour. Everything made fresh in our kitchen.</p></div><div className="menu-grid">{menu.map(item => <article className="menu-card" key={item.name}><div className="menu-icon">{item.emoji}</div><div><h3>{item.name}</h3><p>{item.desc}</p></div><strong>{item.price}</strong></article>)}</div></section>
      <section id="story" className="restaurant-story"><div><span className="demo-kicker">THE SAVORA STORY</span><h2>A neighbourhood table with a <em>big appetite.</em></h2></div><p>We started with one idea: make restaurant food feel personal again. Savora brings together a small team of chefs, local producers and people who genuinely love hospitality.</p></section>
      <footer id="contact" className="demo-footer"><span>SAVORA • MODERN KITCHEN</span><span>Open daily · 11:30 AM — 11:00 PM</span><Link href="/">← Back to ScaleUp</Link></footer>
    </main>
  );
}

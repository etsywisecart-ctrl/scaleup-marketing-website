"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const products = [
  { id: 1, name: "Smoky Chicken Burger", cat: "Mains", price: 15, emoji: "🍔" },
  { id: 2, name: "Truffle Mushroom Pasta", cat: "Mains", price: 18, emoji: "🍝" },
  { id: 3, name: "Fire-Roasted Salmon", cat: "Mains", price: 24, emoji: "🐟" },
  { id: 4, name: "Burrata Garden Salad", cat: "Starters", price: 14, emoji: "🥗" },
  { id: 5, name: "Sparkling Lemonade", cat: "Drinks", price: 6, emoji: "🍋" },
  { id: 6, name: "Tiramisu", cat: "Desserts", price: 9, emoji: "🍰" },
];

export default function RestaurantPOSDemo() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [category, setCategory] = useState("All");
  const [table, setTable] = useState(7);
  const categories = ["All", "Mains", "Starters", "Drinks", "Desserts"];
  const items = products.filter(p => category === "All" || p.cat === category);
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  const subtotal = useMemo(() => products.reduce((sum,p) => sum + p.price*(cart[p.id]||0), 0), [cart]);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  function add(id:number){ setCart(c=>({...c,[id]:(c[id]||0)+1})); }
  function remove(id:number){ setCart(c=>{const n={...c}; if(!n[id]) return n; n[id]--; if(n[id]===0) delete n[id]; return n;}); }

  return (
    <main className="pos-demo">
      <header className="pos-top"><Link href="/" className="pos-brand">SAVORA <span>POS</span></Link><div className="pos-status"><i/> Register 01 · Online</div><div className="pos-user">Manager ▾</div></header>
      <div className="pos-layout">
        <section className="pos-main"><div className="pos-heading"><div><span className="demo-kicker">RESTAURANT OPERATIONS</span><h1>Point of Sale</h1></div><div className="table-picker"><label>Table</label><select value={table} onChange={e=>setTable(Number(e.target.value))}>{[1,2,3,4,5,6,7,8,9,10,11,12].map(n=><option key={n}>{n}</option>)}</select></div></div><div className="pos-cats">{categories.map(c=><button className={category===c?"active":""} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div><div className="pos-products">{items.map(p=><button className="pos-product" key={p.id} onClick={()=>add(p.id)}><span className="pos-product-icon">{p.emoji}</span><span><b>{p.name}</b><small>{p.cat}</small></span><strong>{"$"+p.price.toFixed(2)}</strong></button>)}</div></section>
        <aside className="pos-order"><div className="order-head"><div><span>Current order</span><h2>Table {table}</h2></div><span className="order-count">{count} items</span></div><div className="order-lines">{count===0 ? <div className="empty-order">Tap a menu item<br/>to start this order.</div> : products.filter(p=>cart[p.id]).map(p=><div className="order-line" key={p.id}><span className="order-emoji">{p.emoji}</span><div><b>{p.name}</b><small>{"$"+p.price.toFixed(2)} each</small></div><div className="qty"><button onClick={()=>remove(p.id)}>−</button><b>{cart[p.id]}</b><button onClick={()=>add(p.id)}>+</button></div><strong>{"$"+(p.price*cart[p.id]).toFixed(2)}</strong></div>)}</div><div className="order-summary"><div><span>Subtotal</span><b>{"$"+subtotal.toFixed(2)}</b></div><div><span>Tax 5%</span><b>{"$"+tax.toFixed(2)}</b></div><div className="order-total"><span>Total</span><strong>{"$"+total.toFixed(2)}</strong></div><button className="charge-btn" disabled={!count}>Charge {"$"+total.toFixed(2)} →</button></div></aside>
      </div>
    </main>
  );
}

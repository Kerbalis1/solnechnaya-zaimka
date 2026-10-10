'use client';
import { ArrowIcon } from '@/components/ArrowIcon';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/data/site';
export function SunMark({className=''}:{className?:string}) {
 return <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.3"/>{Array.from({length:12},(_,i)=><path key={i} d="M24 3v6" stroke="currentColor" strokeWidth="1.3" transform={`rotate(${i*30} 24 24)`}/>)}</svg>;
}
export function Header() {
 const [open,setOpen]=useState(false);const button=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape' && open){setOpen(false);button.current?.focus();}};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[open]);
 return <header className="site-header"><div className="header-inner">
  <a className="brand" href="#home" aria-label="Солнечная Заимка — на главную"><SunMark/><span>Солнечная Заимка<small>БАЗА ОТДЫХА · ТУЛУН</small></span></a>
  <nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(n=><a key={n.href} href={n.href}>{n.label}</a>)}</nav>
  <a href="#booking" className="button header-cta">Узнать свободные даты <ArrowIcon/></a>
  <button className="menu-toggle" ref={button} onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls={open?"mobile-nav":undefined} aria-label={open?'Закрыть меню':'Открыть меню'}><span/ ><span/ ></button>
 </div>{open && <nav className="mobile-nav" id="mobile-nav" aria-label="Мобильная навигация">{navigation.map(n=><a key={n.href} href={n.href} onClick={()=>setOpen(false)}>{n.label}<ArrowIcon/></a>)}<a className="button" href="#booking" onClick={()=>setOpen(false)}>Узнать свободные даты</a></nav>}</header>;
}

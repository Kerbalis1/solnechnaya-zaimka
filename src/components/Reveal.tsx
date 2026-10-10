'use client';
import { useEffect } from 'react';
export function Reveal() {
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const elements=document.querySelectorAll('[data-reveal]');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');observer.unobserve(entry.target);}}),{threshold:.08});
  elements.forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('reveal-pending');observer.observe(el);}});
  return()=>{observer.disconnect();elements.forEach(el=>el.classList.remove('reveal-pending'));};
 },[]);return null;
}

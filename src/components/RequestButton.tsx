'use client';
import { ArrowIcon } from '@/components/ArrowIcon';
import { type ObjectId } from '@/data/site';
export function RequestButton({ object, children = 'Запросить бронирование', className = 'text-link' }:{object:ObjectId;children?:React.ReactNode;className?:string}) {
 function select(){window.dispatchEvent(new CustomEvent('booking-select',{detail:object}));document.getElementById('booking')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 return <button className={className} onClick={select}>{children}<ArrowIcon/></button>;
}

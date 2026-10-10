'use client';
import { ArrowIcon } from '@/components/ArrowIcon';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import { Media } from './Media';
export function Gallery() {
 const [index,setIndex]=useState(0);const dialog=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement|null>(null);const touch=useRef<number|null>(null);
 const items=site.gallery; const current=items[index];
 const move=(delta:number)=>setIndex(i=>(i+delta+items.length)%items.length);
 function open(i:number,button:HTMLButtonElement){trigger.current=button;setIndex(i);dialog.current?.showModal();}
 function close(){dialog.current?.close();}
 useEffect(()=>{
  const el=dialog.current;if(!el)return;
  const closed=()=>{document.body.style.overflow='';trigger.current?.focus();};
  const beforeOpen=new MutationObserver(()=>{if(el.open)document.body.style.overflow='hidden';});beforeOpen.observe(el,{attributes:true,attributeFilter:['open']});
  el.addEventListener('close',closed);return()=>{el.removeEventListener('close',closed);beforeOpen.disconnect();document.body.style.overflow='';};
 },[]);
 return <><div className="gallery-grid">{items.map((item,i)=><button key={item.title} className={`gallery-item gallery-item-${i}`} onClick={e=>open(i,e.currentTarget)} aria-label={`Открыть: ${item.title}${item.image?'':' — место для фотографии'}`}>
  <Media image={item.image} title={item.title} kind={item.art}/><span className="gallery-caption"><span>{item.title}</span><ArrowIcon className="gallery-expand"/></span>
 </button>)}</div><p className="gallery-footnote">Фотографии из архива базы. Подписанные эскизы будут заменены снимками владельца.</p>
 <dialog ref={dialog} className="lightbox" aria-labelledby="gallery-title" onClick={e=>{if(e.target===e.currentTarget)close();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='Home'){e.preventDefault();setIndex(0);}if(e.key==='End'){e.preventDefault();setIndex(items.length-1);}}}>
  <div className="lightbox-inner" onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current!==null){const distance=e.changedTouches[0].clientX-touch.current;if(Math.abs(distance)>50)move(distance<0?1:-1);}touch.current=null;}}>
   <div className="lightbox-top"><span>Солнечная Заимка · Галерея</span><button className="icon-button" onClick={close} aria-label="Закрыть галерею" autoFocus>×</button></div>
   <Media key={current.title} image={current.image} title={current.title} kind={current.art} eager/>
   <div className="lightbox-bottom"><div aria-live="polite"><h3 id="gallery-title">{current.title}</h3><p>{current.image?current.subtitle:'Место для фотографии. Снимок будет добавлен владельцем.'}</p></div><div className="gallery-controls"><button className="icon-button" onClick={()=>move(-1)} aria-label="Предыдущее фото">←</button><span>{String(index+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span><button className="icon-button" onClick={()=>move(1)} aria-label="Следующее фото">→</button></div></div>
  </div>
 </dialog></>;
}

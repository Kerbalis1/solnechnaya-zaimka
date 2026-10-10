'use client';
import { useState } from 'react';
import { asset } from '@/data/site';
import { Artwork } from './Artwork';
export function Media({ image, title, kind, className = '', eager = false }: { image: string|null; title:string;kind:string;className?:string;eager?:boolean }) {
 const [failed,setFailed]=useState(false);
 return <div className={`media ${className}`}>
  {image && !failed ? <img src={asset(image)} alt={title} loading={eager?'eager':'lazy'} decoding="async" onError={()=>setFailed(true)}/> : <><Artwork kind={kind}/><span className="media-note">Место для фотографии · {title}</span></>}
 </div>;
}

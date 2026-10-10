'use client';
import { ArrowIcon } from '@/components/ArrowIcon';
import { useEffect, useRef, useState } from 'react';
import { site, type ObjectId } from '@/data/site';
import { initialBooking,validateBooking,todayInTulun,bookingPayload,bookingSummary,type BookingValues,type BookingErrors } from '@/lib/booking';
const endpoint=process.env.NEXT_PUBLIC_BOOKING_ENDPOINT || '';
export function BookingForm() {
 const [values,setValues]=useState<BookingValues>(initialBooking);const [errors,setErrors]=useState<BookingErrors>({});const [today,setToday]=useState('');
 const [ready,setReady]=useState(false);const [pending,setPending]=useState(false);const [result,setResult]=useState<'demo'|'accepted'|'error'|null>(null);const [summary,setSummary]=useState('');const [copyState,setCopyState]=useState('');
 const form=useRef<HTMLFormElement>(null);const inFlight=useRef(false);const abort=useRef<AbortController|null>(null);
 const object=site.objects.find(o=>o.id===values.object)!;
 useEffect(()=>{setReady(true);setToday(todayInTulun());const select=(e:Event)=>{const id=(e as CustomEvent<ObjectId>).detail;if(inFlight.current)return;if(!site.objects.some(o=>o.id===id))return;setValues(v=>({...v,object:id}));setErrors({});setResult(null);form.current?.querySelector<HTMLSelectElement>('#object')?.focus({preventScroll:true});};window.addEventListener('booking-select',select);return()=>{window.removeEventListener('booking-select',select);abort.current?.abort();};},[]);
 function change(key:keyof BookingValues,value:string){setValues(v=>({...v,[key]:value}));setErrors(e=>key==='object'?{}:{...e,[key]:undefined});setResult(null);setCopyState('');}
 const props=(key:keyof BookingValues)=>({id:key,name:key,value:values[key],onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>change(key,e.target.value),'aria-invalid':!!errors[key],'aria-describedby':errors[key]?`${key}-error`:undefined});
 const error=(key:keyof BookingValues)=>errors[key] && <span id={`${key}-error`} className="field-error">{errors[key]}</span>;
 async function submit(e:React.FormEvent){e.preventDefault();if(inFlight.current)return;setResult(null);setCopyState('');const validation=validateBooking(values);setErrors(validation);if(Object.keys(validation).length){form.current?.querySelector<HTMLElement>(`#${Object.keys(validation)[0]}`)?.focus();return;}
  if(!endpoint){setSummary(bookingSummary(values));setResult('demo');return;}
  inFlight.current=true;setPending(true);const controller=new AbortController();abort.current=controller;const timeout=window.setTimeout(()=>controller.abort(),20000);
  try {if(!endpoint.startsWith('https://'))throw new Error('Invalid endpoint');const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(bookingPayload(values)),signal:controller.signal});const body=await response.json();if(!response.ok || body.accepted!==true)throw new Error('Not accepted');setResult('accepted');}
  catch {setResult('error');}finally {clearTimeout(timeout);inFlight.current=false;setPending(false);}
 }
 async function copy(){try {await navigator.clipboard.writeText(summary);setCopyState('Текст скопирован.');}catch{setCopyState('Автоматическое копирование недоступно. Выделите и скопируйте текст ниже.');}}
 return <form className="booking-form" ref={form} onSubmit={submit} noValidate aria-busy={pending}>
  <noscript><p className="demo-notice">Для подготовки запроса включите JavaScript. Форма не отправляет данные без подключения сервиса.</p></noscript><div className="form-top"><span className="eyebrow">Ваши планы</span><span className="form-price">{object.price} <small>{object.unit}</small></span></div>
  {!endpoint && <p className="demo-notice"><span aria-hidden="true">○</span> Демонстрационная форма. Данные не отправляются владельцу.</p>}
  <fieldset disabled={pending || !ready}><legend className="sr-only">Данные запроса</legend><div className="form-grid">
   <div className="field full"><label htmlFor="object">Объект <span>*</span></label><select {...props('object')} required>{site.objects.map(o=><option key={o.id} value={o.id}>{o.title}</option>)}</select>{error('object')}</div>
   <div className="field"><label htmlFor="arrival">{object.category==='stay'?'Дата заезда':object.category==='tub'?'Желаемая дата':'Дата'} <span>*</span></label><input {...props('arrival')} type="date" min={today || undefined} required/>{error('arrival')}</div>
   {object.category==='stay'?<div className="field"><label htmlFor="departure">Дата выезда <span>*</span></label><input {...props('departure')} type="date" min={values.arrival || today || undefined} required/>{error('departure')}</div>:<div className="field"><label htmlFor="time">{object.category==='tub'?'Желаемое время':'Время начала'} <span>*</span></label><input {...props('time')} type="time" required/>{error('time')}</div>}
   {object.category==='timed' && <div className="field"><label htmlFor="duration">Длительность, часов <span>*</span></label><input {...props('duration')} type="number" min="0" step="any" placeholder="Укажите длительность" required/>{error('duration')}</div>}
   <div className={`field ${object.category==='timed'?'':'full'}`}><label htmlFor="guests">Количество гостей <span>*</span></label><input {...props('guests')} type="number" min="1" step="1" inputMode="numeric" placeholder="Укажите количество" required/>{error('guests')}</div>
   <div className="field"><label htmlFor="name">Ваше имя <span>*</span></label><input {...props('name')} type="text" autoComplete="given-name" placeholder="Как к вам обращаться" maxLength={80} required/>{error('name')}</div>
   <div className="field"><label htmlFor="phone">Телефон <span>*</span></label><input {...props('phone')} type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" maxLength={30} required/>{error('phone')}</div>
   <div className="field full"><label htmlFor="comment">Комментарий <small>необязательно</small></label><textarea {...props('comment')} rows={3} maxLength={2000} placeholder={object.category==='tub'?'Что хотите уточнить о составе услуги и условиях?':'Расскажите о планах или задайте вопрос'}/>{error('comment')}</div>
  </div></fieldset>
  <p className="form-note">{object.category==='tub'?object.note+'. ':''}{object.category!=='stay'?'Время указывается по Тулуну (UTC+8). ':''}Отправка запроса не является подтверждённой бронью.</p>
  <button className="button form-submit" type="submit" disabled={pending || !ready}>{pending?'Отправляем запрос…':endpoint?'Отправить запрос':'Подготовить запрос'}<ArrowIcon/></button>
  <div className="form-result" role="status" aria-live="polite">
   {result==='demo' && <div className="result-panel"><h3>Запрос подготовлен</h3><p>Данные не отправлены. Сохраните текст, чтобы передать его владельцу после уточнения контактов.</p><textarea className="summary-text" aria-label="Текст подготовленного запроса" value={summary} readOnly rows={8}/><button type="button" className="text-link" onClick={copy}>Скопировать запрос <ArrowIcon/></button><p>{copyState}</p></div>}
   {result==='accepted' && <div className="result-panel"><h3>Запрос принят сервисом</h3><p>Ожидайте ответа владельца. Бронь будет действовать после его подтверждения.</p></div>}
   {result==='error' && <p className="submit-error">Не удалось отправить запрос. Доставка не подтверждена. Попробуйте ещё раз.</p>}
  </div>
 </form>;
}

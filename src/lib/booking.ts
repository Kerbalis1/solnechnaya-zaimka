import { site, type ObjectId } from '@/data/site';
export type BookingValues = {object:ObjectId;arrival:string;departure:string;time:string;duration:string;guests:string;name:string;phone:string;comment:string};
export type BookingErrors = Partial<Record<keyof BookingValues,string>>;
export const initialBooking: BookingValues = {object:'cottage',arrival:'',departure:'',time:'',duration:'',guests:'',name:'',phone:'',comment:''};
export function todayInTulun(now = new Date()): string {
 const parts = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Irkutsk',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const get=(type:string)=>parts.find(p=>p.type===type)?.value;
 return `${get('year')}-${get('month')}-${get('day')}`;
}
function validDate(value:string) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
 const d=new Date(value+'T00:00:00Z');return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10)===value;
}
export function validateBooking(values:BookingValues, today=todayInTulun()):BookingErrors {
 const errors:BookingErrors={};
 const object=site.objects.find(o=>o.id===values.object);
 if(!object)errors.object='Выберите объект.';
 if(!values.arrival)errors.arrival='Укажите дату.';
 else if(!validDate(values.arrival))errors.arrival='Укажите корректную дату.';
 else if(values.arrival<today)errors.arrival='Выберите сегодняшнюю или будущую дату.';
 if(object?.category==='stay') {
  if(!values.departure)errors.departure='Укажите дату выезда.';
  else if(!validDate(values.departure))errors.departure='Укажите корректную дату.';
  else if(values.departure<=values.arrival)errors.departure='Выезд должен быть позже заезда.';
 } else {
  if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(values.time))errors.time='Укажите время начала.';
  if(object?.category==='timed' && (!values.duration.trim() || !Number.isFinite(Number(values.duration)) || Number(values.duration)<=0))errors.duration='Укажите длительность больше нуля.';
 }
 if(!/^\d+$/.test(values.guests) || !Number.isSafeInteger(Number(values.guests)) || Number(values.guests)<=0)errors.guests='Укажите целое количество гостей больше нуля.';
 if(values.name.trim().length<2)errors.name='Укажите имя — не менее двух символов.';
 const phone=values.phone.replace(/[\s()\-]/g,'');
 if(!/^(?:\+7|8)\d{10}$/.test(phone))errors.phone='Введите телефон: +7 или 8 и ещё 10 цифр.';
 return errors;
}
export function bookingPayload(values:BookingValues) {
 const object=site.objects.find(o=>o.id===values.object)!;
 return {object:object.id,objectName:object.title,date:values.arrival,
  ...(object.category==='stay'?{departure:values.departure}:{time:values.time}),
  ...(object.category==='timed'?{durationHours:Number(values.duration)}:{}),
  guests:Number(values.guests),name:values.name.trim(),phone:values.phone.trim(),comment:values.comment.trim(),timeZone:'Asia/Irkutsk'};
}
export function bookingSummary(values:BookingValues) {
 const object=site.objects.find(o=>o.id===values.object)!;
 return [`Запрос: ${object.title}`,`Дата: ${values.arrival}`,
  ...(object.category==='stay'?[`Выезд: ${values.departure}`]:[`Время: ${values.time} (Тулун)`]),
  ...(object.category==='timed'?[`Длительность: ${values.duration} ч`]:[]),
  `Гостей: ${values.guests}`,`Имя: ${values.name.trim()}`,`Телефон: ${values.phone.trim()}`,
  ...(values.comment.trim()?[`Комментарий: ${values.comment.trim()}`]:[]),
  'Это запрос. Бронирование требует подтверждения владельца.'].join('\n');
}

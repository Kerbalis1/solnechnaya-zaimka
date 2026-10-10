export type ObjectId = 'cottage' | 'barn-1' | 'barn-2' | 'sauna' | 'tub' | 'grill';
export type StayObject = { id: ObjectId; title: string; category: 'stay' | 'timed' | 'tub'; eyebrow: string; description: string; price: string; unit: string; note: string; image: string | null; art: 'house' | 'barn' | 'sauna' | 'tub' | 'grill' };
// All confirmed facts, prices, photos and contacts live here. Null means not confirmed.
export const site = {
 name: 'Солнечная Заимка', location: 'Тулун, Иркутская область, берег реки Ия',
 description: 'Солнечная Заимка — отдых на берегу реки Ия в Тулуне. Коттедж, барнхаусы, баня, чан и гриль-домик.',
 phone: null as string | null, address: null as string | null,
 mapUrl: null as string | null, routeUrl: null as string | null,
 messengers: [] as { title: string; url: string }[],
 heroImage: '/images/river-premium.webp' as string | null,
 objects: [
  { id:'cottage',title:'Коттедж',category:'stay',eyebrow:'Для вашего отдыха',description:'Место для времени с близкими. Выберите даты и уточните условия проживания у владельца.',price:'6 000 ₽',unit:'/ сутки',note:'Аренда коттеджа',image:'/images/cottage.webp',art:'house' },
  { id:'barn-1',title:'Барнхаус № 1',category:'stay',eyebrow:'Отдельный домик',description:'Загородный отдых в стиле барнхаус. Стоимость и детали проживания уточняются при бронировании.',price:'Стоимость по запросу',unit:'',note:'Отдельный домик в стиле барнхаус',image:null,art:'barn' },
  { id:'barn-2',title:'Барнхаус № 2',category:'stay',eyebrow:'Отдельный домик',description:'Ещё один домик для вашей поездки. Запросите свободные даты и условия размещения.',price:'Стоимость по запросу',unit:'',note:'Отдельный домик в стиле барнхаус',image:null,art:'barn' },
  { id:'sauna',title:'Баня',category:'timed',eyebrow:'Тепло, которое сближает',description:'Добавьте в планы баню — и оставьте время для неспешного отдыха.',price:'5 500 ₽',unit:'/ 2 часа',note:'Условия аренды уточняйте при бронировании.',image:'/images/sauna.webp',art:'sauna' },
  { id:'tub',title:'Чан',category:'tub',eyebrow:'Пауза в ритме дня',description:'Особенный повод остановиться и побыть вместе.',price:'от 4 000 ₽',unit:'/ услуга',note:'Состав услуги и условия уточняйте при бронировании',image:null,art:'tub' },
  { id:'grill',title:'Гриль-домик',category:'timed',eyebrow:'За одним столом',description:'Собраться с друзьями, поговорить с близкими и провести время вместе. Выберите удобную дату для встречи.',price:'1 200 ₽',unit:'/ час',note:'Оснащение и вместимость уточняйте у владельца.',image:null,art:'grill' },
 ] satisfies StayObject[],
 gallery: [
  {title:'Территория',subtitle:'Среди деревьев',image:'/images/territory.webp' as string|null,art:'landscape'},
  {title:'Река Ия',subtitle:'Вид на реку',image:'/images/river-wide.webp' as string|null,art:'river'},
  {title:'Коттедж',subtitle:'Вид снаружи',image:'/images/cottage.webp' as string|null,art:'house'},
  {title:'Вечер у реки',subtitle:'Вид на Ию',image:'/images/river-evening.webp' as string|null,art:'river'},
  {title:'Барнхаус № 1',subtitle:'Первый отдельный домик',image:null as string|null,art:'barn'},
  {title:'Барнхаус № 2',subtitle:'Второй отдельный домик',image:null as string|null,art:'barn'},
  {title:'Баня',subtitle:'Вид снаружи',image:'/images/sauna.webp' as string|null,art:'sauna'},
  {title:'Чан',subtitle:'Расположение и вид',image:null as string|null,art:'tub'},
  {title:'Гриль-домик',subtitle:'Пространство для встречи',image:null as string|null,art:'grill'},
 ],
 faq: [
  {question:'Как забронировать проживание?',answer:'Выберите коттедж или барнхаус, укажите желаемые даты и запросите условия у владельца. Бронирование считается подтверждённым только после подтверждения владельцем. В текущей демонстрационной версии отправка запросов не подключена.'},
  {question:'Сколько стоит отдых?',answer:'Коттедж — 6 000 ₽ за сутки. Баня — 5 500 ₽ за 2 часа. Чан — от 4 000 ₽ за услугу. Гриль-домик — 1 200 ₽ за час. Стоимость проживания в барнхаусах уточняется по запросу.'},
  {question:'Как уточнить состав услуги для чана?',answer:'При бронировании согласуйте с владельцем состав услуги, время и условия. Указана стоимость от 4 000 ₽ за услугу.'},
 ],
};
export const navigation = [{href:'#stay',label:'Проживание'},{href:'#wellness',label:'Баня и чан'},{href:'#grill',label:'Гриль-домик'},{href:'#gallery',label:'Галерея'},{href:'#contacts',label:'Контакты'}];
export function asset(path: string) { return `${(process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`; }

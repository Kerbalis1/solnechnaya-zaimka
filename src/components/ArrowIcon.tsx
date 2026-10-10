export function ArrowIcon({direction='diagonal',className=''}:{direction?:'diagonal'|'right'|'down'|'up';className?:string}) {
 const rotation=direction==='right'?45:direction==='down'?135:direction==='up'?-45:0;
 return <svg className={`arrow-icon ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><g transform={`rotate(${rotation} 12 12)`}><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></g></svg>;
}

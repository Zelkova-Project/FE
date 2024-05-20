import '../css/section.css'

const Section = ({children, isMain, isLast}) => {
 console.log(isMain)

 let classList = 'section-container';
 if (isMain) classList = 'section-container main-height';
 if (isLast) classList = 'section-container main-height mt-40';

 return (
  <div className={classList}>
   {children}
  </div>
 )
}

export default Section;
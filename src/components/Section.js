import '../css/section.css'

const Section = ({children, isMain}) => {
 console.log(isMain)

 return (
  <div className={isMain ? 'section-container main-height' : 'section-container'}>
   {children}
  </div>
 )
}

export default Section;
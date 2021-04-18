

import css from './css/FindGroup.module.css';


const FindGroup = (props) => {
  return (
  <div className= {css.main}>
    <div className ={css.inputGr} >
      <input  className={css.inpFile } type="file" />
      <button className={`${css.btn} ${css.search}`} >Найти</button>
    </div>
  </div>
  )
  
  }

    export default FindGroup;

    
  

import css from './css/CountAll.module.css';



const CountAll = (props) => {

  return (
    <div className= {css.countRecord} >{props.txt}</div>
  )
  }

    export default CountAll;
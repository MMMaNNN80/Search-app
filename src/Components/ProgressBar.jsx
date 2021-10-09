import '../App.css';

const ProgressBar = (props) => {


  return (
    <div className="progress">
      <div className="progress-bar progress-bar-striped"
        role="progressbar" style={{ width: props.search.procentValue ,backgroundColor: 'blueviolet' }}>

        <div className="Percontent"> {props.search.procentValue} </div>

      </div>

    </div>

  )

}

export default ProgressBar;

       // {aria-valuenow ='10' aria-valuemin ="0" aria-valuemax="100"}  cornflowerblue

    
  
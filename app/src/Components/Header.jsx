import '../App.css';

const HeaderText =(props) => {
    return (
    <div className="text-left z_txt">
              <h2 style = {{textShadow: '1px 0.5px 0.2px black'}}> {props.txt} </h2>
          </div>
    );
    }

    export default HeaderText;
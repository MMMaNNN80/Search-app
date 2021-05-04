import './App.css';
import HeaderText from './Components/Header.jsx';
import FindGroup from './Components/FindGroup.jsx';
import  CountAll from './Components/CountAll.jsx';
import Preview from './Components/Preview.jsx';
import {BrowserRouter } from 'react-router-dom';
import ProgressBar from './Components/ProgressBar';


const App = (props) => {
  

  return (
    <BrowserRouter>
    <div className="App-header">
    <div className="cont">
      <HeaderText  txt = {props.state.mass_txt}/>
      <FindGroup selectFile = {props.state.inpEvent} search = {props.state.search} />
      <CountAll txt = {props.state.count_txt}  /> 
      <ProgressBar search = {props.state.search} />
      <Preview  tblContent= {props.state.tblContent}/> 
      </div>
    </div>
    </BrowserRouter>
  );
}
export default App;

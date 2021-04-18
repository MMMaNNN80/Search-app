import './App.css';
import HeaderText from './Components/Header.jsx';
import FindGroup from './Components/FindGroup.jsx';
import  CountAll from './Components/CountAll.jsx';
import {Route,BrowserRouter } from 'react-router-dom';


const App = (props) => {
  return (
    <BrowserRouter>
    <div className="App-header">
    <div className="cont">
      <HeaderText  txt = {props.state.mass_txt}/>
      <FindGroup />
      <CountAll txt = {props.state.count_txt}  />       
      </div>
    </div>
    </BrowserRouter>
  );
}
export default App;

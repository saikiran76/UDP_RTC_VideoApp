import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import socketConnection from './utils/socketConnection'
import MainVideoPage from './videoComponents/MainVideoPage';

const Home = () =>{
  return(
    <div className="App">
    <h1>ST</h1>
    </div> 
  )
}

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" Component={Home}/>
      <Route exact path='/join-video' Component={MainVideoPage} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;

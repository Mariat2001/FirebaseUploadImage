import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import RegisterFirebase from './RegisterFirebase';
import Registertest from './Registertest';
import UploadFile from './UploadFile';

function App() {
  return (
    <div className="App">

 <BrowserRouter>
 <Routes>
 <Route path='/' element={<RegisterFirebase/>}/>
 <Route path='/Register' element={<Registertest/>}/>
 {/* <Route path='/UploadFile' element={<UploadFile/>}/> */}
 </Routes>
 </BrowserRouter>
    </div>
  );
}

export default App;

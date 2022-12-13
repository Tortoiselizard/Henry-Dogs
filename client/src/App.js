import React from 'react';
import { Route, Routes, useLocation} from "react-router-dom"
import Home from "./components/Home/Home.jsx"
import DogDetail from "./components/DogDetail/DogDetail.jsx";
import CreateDog from "./components/CreateDog/CreateDog";
import Nav from './components/Nav/Nav.jsx'
// import './App.css';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/dog/:id" element={<DogDetail></DogDetail>}></Route>
        <Route path="/dog/create" element={<CreateDog></CreateDog>}></Route>
      </Routes>
      <h1>Henry Dogs</h1>
    </div>
  );
}

export default App;

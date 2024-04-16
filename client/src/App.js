import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Homepage from "./components/Homepage";
import Navbarr from "./components/navbarr";



function App() {

  return (
    <>
       <BrowserRouter>
         <Routes>
           <Route path="/" exact Component={Homepage} />
           <Route path="/reviews" Component={Navbarr} />
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
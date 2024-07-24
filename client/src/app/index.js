import React from "react";
import Login from "../pages/login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Notes from "../pages/notes";
import Main from "../layouts/main";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/notes" element={<Main />}>
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
    </BrowserRouter>
    );
  }
  
  export default App;
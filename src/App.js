import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import { Bookdetails } from "./components/Bookdetails.jsx";
import { Home } from "./components/Home.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<Bookdetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

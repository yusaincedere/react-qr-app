import "./App.css";
import ListProductComponent from "./components/ListProductComponent";
import HeaderComponent from "./components/HeaderComponent";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListProductComponent />}></Route>
            <Route path="/products" element={<ListProductComponent />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

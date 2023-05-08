import "./App.css";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card from "./screens/card/";
import Header from "./screens/header";
import BookMarked from "./screens/bookmark";
function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/bookmarked" element={<BookMarked />}></Route>
        </Routes>
      </BrowserRouter>    
    </div>
  );
}

export default App;
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
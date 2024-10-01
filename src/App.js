import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PointRequest from "./Components/Club/PointRequest";
import LandingPage from "./Components/LandingPage";

const styles = {
  background: {
    backgroundColor: "#6a4593",
    heigth: "100vh",
    minHeigth: "100%",
  },

  images: {
    width: "30vw",
  },
};

function App() {
  return (
    <div className="App" style={styles.background}>
      <body>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/consultar_puntos" element={<PointRequest />} />
          </Routes>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;

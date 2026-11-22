import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Models from "./pages/Models";
import ModelDetails from "./pages/ModelDetails";
import Comparison from "./pages/Comparison";
import Leaderboard from "./pages/Leaderboard";
import Providers from "./pages/Providers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<Models />} />
        <Route path="/models/:id" element={<ModelDetails />} />
        <Route path="/compare" element={<Comparison />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/providers" element={<Providers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

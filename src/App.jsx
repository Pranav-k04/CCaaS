import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import LoginPage from "./Login";
import FileUploader from "./Verify";
import MainPage from "./MainPage";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/verify" element={<FileUploader />}/>
        </Routes>
      </div>
    </Router>
  );
}

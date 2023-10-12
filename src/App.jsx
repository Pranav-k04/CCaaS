import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import LoginPage from "./Login";
import FileUploader from "./Verify";
import MainPage from "./MainPage";
import RegisterVerify from "./OTP";
import Upload from "./Upload";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/verify" element={<FileUploader />} />
          <Route path="/register/verify" element={<RegisterVerify />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import LoginPage from "./Login";
import FileUploader from "./UploadFile";
export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<FileUploader/>}/>
        </Routes>
      </div>
    </Router>
  );
}

import axios from 'axios';
import { useState } from 'react';

function UploadFile() {
  const [file, setFile] = useState();
  const [otp, setOtp] = useState(''); // Step 2: State for OTP

  function handleMultipleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleMultipleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", localStorage.getItem("login-email"))
    formData.append("otp", +otp)
    formData.append('file', file, file.name);
    
    await axios.post(import.meta.env.VITE_SERVER_IP+"/user/loginotp", formData, {
      headers: {
        "Content-Type": "multiipart/form-data"
      }
    }).then(res => {
      localStorage.removeItem("login-email")
      if(res.data?.status_code >= 400) {
        console.log(res.data)
      }
      else {
        localStorage.setItem("session", JSON.stringify(res.data))
      }
    }).catch(console.log)
  }

  // Step 4: Handle OTP input change
  function handleOtpChange(event) {
    setOtp(event.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={handleMultipleSubmit}>
        <h1>Enter OTP and Upload the secret key file to sign</h1>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          required
        />
        <input type="file" onChange={handleMultipleChange} />
        
        
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadFile;

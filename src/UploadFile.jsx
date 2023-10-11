import React, { useState } from 'react';
import axios from 'axios';

function UploadFile() {
  const [file, setFile] = useState();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [otp, setOtp] = useState(''); // Step 2: State for OTP

  function handleMultipleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleMultipleSubmit(event) {
    event.preventDefault();
    const url = 'http://10.0.11.175:6969/api/test/upload';
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('otp', otp); // Step 3: Include OTP in the form data
    console.log(formData);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setUploadedFiles(response.data.files);
      })
      .catch((error) => {
        console.error('Error uploading files: ', error);
      });
  }

  // Step 4: Handle OTP input change
  function handleOtpChange(event) {
    setOtp(event.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={handleMultipleSubmit}>
        <h1>2FA & React File Upload </h1>
        <input
          type="password"
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

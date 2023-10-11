import React, { useState } from "react";

export default function RegisterVerify() {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (event) => {
    setOtp(event.target.value); 
    };

  const handleMultipleSubmit = (event) => {
    event.preventDefault();
    setOtp("");
  };

  return (
    <>
      <form onSubmit={handleMultipleSubmit}>
        <h1>Enter OTP to Sign-IN / Log-IN </h1>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

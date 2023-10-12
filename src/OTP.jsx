import { useState } from "react";
import axios from "axios"

export default function RegisterVerify() {
    const [otp, setOtp] = useState(0);
    const handleOtpChange = (event) => {
        setOtp(+event.target.value);
    };

    const handleMultipleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(import.meta.env.VITE_SERVER_IP+"/user/signupotp", {
            email: localStorage.getItem("signup-email"),
            otp: +otp
        }).then(res => {
            if(res.data?.status_code >= 400) {
                window.location.reload()
            }
            const blob = new Blob([res.data], {type: res.headers["Content-Type"]})
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = "id_dsa.pem"
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(url)
            window.location.replace("/login")
        }).catch(console.log)
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
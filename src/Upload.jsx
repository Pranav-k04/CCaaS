import { useState } from "react";
import axios from "axios";

export default function Upload() {
    const [file, setFile] = useState();
    const session = JSON.parse(localStorage.getItem("session"))
    function handleMultipleChange(event) {
        setFile(event.target.files[0]);
    }

    async function handleMultipleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file, file.name);
        
        await axios.post(import.meta.env.VITE_SERVER_IP+"/files/upload", formData, {
          headers: {
            "Content-Type": "multiipart/form-data",
            Authorization: `Bearer ${session.access_token}`
          }
        }).then(res => {
          if(res.data?.status_code >= 400) {
            console.log(res.data)
          }
          else {
            window.location.replace("/")
          }
        }).catch(console.log)
      }

    return (
        <>
            <form onSubmit={handleMultipleSubmit}>
                <h1>Enter the file you want to upload</h1>
                <br />
                <br />
                <input type="file" onChange={handleMultipleChange} />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}
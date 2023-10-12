import axios from "axios"
import { useEffect, useState } from "react"

export default function MainPage() {
    const session = JSON.parse(localStorage.getItem("session"))
    const [files, setFiles] = useState([])
    async function getFileData() {
        await axios.get(import.meta.env.VITE_SERVER_IP+"/files/get", {
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        }).then(res => res.data).then(res => {
            if(res?.status_code >= 400) {
                localStorage.removeItem("session")
                window.location.replace("/login")
            }
            else {
                setFiles(res)
            }
        }).catch(err => console.log(err.response))
    }
    useEffect(() => {
        getFileData()
    }, [])
    console.log(files)
    if (!session) {
        window.location.replace("/login")
        return
    }
    async function handleDownloadFile(e, filename) {
        e.preventDefault()
        if(!filename || !filename.length) {
            return
        }
        await axios.get(import.meta.env.VITE_SERVER_IP+"/files/download/"+filename, {
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        }).then(res => {
            if(res.data?.status_code >= 400) {
                window.location.reload()
            }
            const blob = new Blob([res.data], {type: res.headers["Content-Type"]})
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = filename
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(url)
        })
    }
    return (
        <>
            <h1> Here are your uploaded files </h1>
            <div>
                {files?.map(file => (
                    <div key={file._id}>
                        <h4>{file.file}</h4><button onClick={async (e) => await handleDownloadFile(e, file.file)}>Download</button>
                    </div>
                ))}
            </div>
        </>
    )
}
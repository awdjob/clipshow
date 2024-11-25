import React, { useEffect, useState } from 'react';

const App = () => {
    const [clips, setClips] = useState([])

    const fetchClips = async () => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const res = await fetch("/list-clips", {
            headers,
        })

        const clips = await res.json()

        setClips(clips)
    }

    useEffect(() => {
        fetchClips()
    }, [])

    const triggerClip = async (clip) => {
        await fetch(`/trigger/${clip}`)
    }

    return (
        <div style={{display: "flex"}}>
            {clips.map((c, i) => (
                <div 
                    key={i} 
                    style={{ borderRadius: "10px", background: "#e3e3e3", height: "200px", width: "200px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px"}}
                    onClick={() => triggerClip(c)}
                >
                    <h3 style={{textAlign: "center"}}>
                        { c }
                    </h3>
                </div>
            ))}
        </div>
    )
}

export default App
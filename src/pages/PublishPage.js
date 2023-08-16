import React from 'react'

export default function PublishPage() {
    return (
        <>
            <header>Linkr</header>
            <h1>Timeline</h1>
            <div>
                <h3>What are you going to share today?</h3>
                <input type="text" label="Link" required></input>
                <input type="text" label="Descrição"></input>
                <button>Publish</button>
            </div>
        </>
    )
}

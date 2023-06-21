import React from 'react'
import icon from '../img/icon.png'
import '../css/Cover.css'

function Cover(props) {
    return (
        <main className="cover">
            <img alt="icon" src={icon} id="icon"></img>
            <button type="button" onClick={props.open} id="bt-open">Open</button>
        </main>
    )
}

export default Cover

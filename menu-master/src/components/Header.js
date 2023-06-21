import React from 'react'
import '../css/Header.css'

function Header(props) {
    return (
        <header className="header">
            { props ? <p>{props.headerName}</p> : null }
        </header>
    )
}

export default Header
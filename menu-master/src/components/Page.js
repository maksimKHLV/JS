import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import '../css/Page.css'

function Page() {
    return (
        <div className="page">
            <Content />
            <Footer />
        </div>
    )
}

export default Page
import React from 'react'
import Product from './Product'
import Header from './Header'

function Section(props) {

    function getProducts() {

        const data = props.sectionData.diches
        let products = []

        try {
            data.forEach((product, index) => {
                products.push(<Product key={index} data={product} />)
            })
        }
        catch(error) {
            console.log("Error: " + error)
        }

        return products
    }

    return (
        <section className="section">
            <Header headerName={props.sectionData.name} />
            { getProducts() }
        </section>
    )
}
export default Section
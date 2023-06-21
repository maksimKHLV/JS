import React from 'react'
import '../css/Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

function Product(props) {
    return (
        <div className="product">
            <span className="product-child" id="product-description">{props.data.name}</span>
            <div className="product-child" id="img-icon" ><FontAwesomeIcon icon={faImage} /></div>
            <span className="product-child" id="product-details"></span>
            <span className="product-child" id="product-hprice">{props.data.hPrice}</span>
            <span className="product-child" id="product-fprice">{props.data.fPrice}</span>
        </div>
    )
}

export default Product
import React, { useEffect } from 'react'
import data from '../data/menu';
import Section from './Section'

function Content() {

    let numSections = 0;

    useEffect(() => {
        getData()
    })

    function getData() {
        if (typeof data.menu === 'object') {
            numSections = data.menu.length
        }
        else {
            console.log('Unexpected type')
        }
    }

    return (
        <main className="content">
            <Section sectionsCount={numSections} sectionData={data.menu[0]} />
        </main>
    )
}

export default Content
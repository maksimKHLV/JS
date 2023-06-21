import React, { useState } from 'react';
import './App.css';
import Cover from './components/Cover'
import Page from './components/Page'

function App() {

    const [opened, setOpen] = useState(false);

    function openApp() {
        setOpen(true);
    }

    return (
        <div className="App">
            {opened ? <Page /> : <Cover open={openApp} />}
        </div>
    );

}

export default App;

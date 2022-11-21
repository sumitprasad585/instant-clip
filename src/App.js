import React, { Component } from 'react'; 
import './App.css';
import CopyContainer from './components/CopyContainer';
class App extends Component { 
    render() { 
        return (
            <div className="App">
                <CopyContainer />
            </div>
        )
    }
}

export default App;
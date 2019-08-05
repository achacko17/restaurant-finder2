import React from 'react';
import './App.css';

import {Route} from 'react-router-dom'
import Home from './container/Home/Home';
import Main from './container/Main/Main';
import NavBar from './components/Navbar/NavBar';


// if only one page just do
// <div className="App">
//   <Main/>
// </div>

// make sure to yarn add 'react-router-dom' for more than one page

function App() {
  return(
    <div className="App">
          <Route path="/" component={NavBar}/>
          <Route exact path ="/" component={Home}/>
          <Route exact path="/main" component={Main}/>
       
    </div>
  );
}

export default App;

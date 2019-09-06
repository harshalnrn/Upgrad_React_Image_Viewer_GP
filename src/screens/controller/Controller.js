import React,{Component} from 'react';
import Home from '../home/Home.js';
import Login from '../login/Login.js';
import {BrowserRouter as Router,Route } from 'react-router-dom';

class Controller extends Component{
constructor()
{
    super();
    this.baseUrl="https://api.instagram.com/v1/";
}



//note above method gets called first before render()

render(){


return(
<Router>
<div className="main-container">
    
<Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} /> } />
</div>

</Router>
) 

}
}


export default Controller
import './App.css';
import Nav from './components/Nav';
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import ShowProduct from './components/ShowProduct';



function App() {
  return (
    <div className="App-main" >
    <div className="App">
       
      <Router>
      <Nav/>
        
        <Routes>
          <Route path = "/" element = {<h1>Home</h1>}/>

          <Route element = {<PrivateComponent/>}>
            <Route path = "/product" element = {<ShowProduct/>} />
          </Route>
          
          <Route path = "/signup" element = {<Signup/>} />
          <Route path = "/login" element = {<Login/>} />
        </Routes>
      

      </Router>
      
      
    </div>
    </div>
  );
}

export default App;

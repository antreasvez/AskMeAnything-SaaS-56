import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {BrowserRouter as Router, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact ={true} path="/" render = {() =>(<Home/>)}/>
        <Route exact ={true} path="/Login" render = {() =>(<SignIn/>)}/>
        <Route exact ={true} path="/SignUp" render = {() =>(<SignUp/>)}/>
      </div>
    </Router>
  );
}

export default App;

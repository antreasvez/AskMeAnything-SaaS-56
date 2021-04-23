import './App.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import {BrowserRouter as Router, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact ={true} path="/" render = {() =>(<Home/>)}/>
        <Route exact ={true} path="/Login" render = {() =>(<SignIn/>)}/>
      </div>
    </Router>
  );
}

export default App;

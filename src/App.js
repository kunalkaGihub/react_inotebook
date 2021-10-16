import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import React,{useState} from 'react';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
        setAlert(null)
    },1400);
  }

  return (
    <>
    {/* NoteState k jo bhi state variables hai .. vo yeh job bhi componentes or unke componentes me uplabadh ho jaaye */}
    {/* NoteState me puri app k components ko wrap krna hai */}
    <NoteState> 
      <Router>
        <NavBar/>
        <Alert alert={alert}/>
        <div className="container">
        <Switch>
          <Route exact path="/">
              <Home showAlert={showAlert}/>
          </Route>
          <Route exact path="/about">
              <About/>
          </Route>
          <Route exact path="/login">
              <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signup">
              <Signup showAlert={showAlert}/>
          </Route>
        </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;

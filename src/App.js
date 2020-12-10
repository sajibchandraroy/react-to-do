import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login/Login';
import Home from './Home/Home';
import PrivateRoute from './Login/PrivateRoute';
import Dashboard from './Dashboard/Dashboard';
import Add from './Dashboard/Add';
import AllWork from './Dashboard/AllWork';
export const UserContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState([]);
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            {/* <Route path="/add">
              <Add />
            </Route> */}
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>

          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

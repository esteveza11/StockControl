import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Inventory from './pages/Inventory';
import Suppliers from './pages/Suppliers';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/suppliers" component={Suppliers} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

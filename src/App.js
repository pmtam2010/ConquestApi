import React from 'react'; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApiForm from './components/ApiForm';
import './bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <Switch>
            <Route path="/" component={ApiForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
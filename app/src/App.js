import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typograpy from '@material-ui/core/Typography';
import {Switch, Route, BrowserRouter as Router, Link} from 'react-router-dom';
import MainPage from 'pages/MainPage';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typograpy
                variant="h6"
                color="inherit"
                component={Link}
                to="/"
              >
                Facebook admin
              </Typograpy>
            </Toolbar>
          </AppBar>
          <Switch>
             <Route
               exact
               path="/" render={() =>
                 <div
                   style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     width: '100%',
                     height: '100vh'
                   }}
                 >
                   <Button
                     component={Link}
                     to="/details"
                     color="primary"
                     variant="contained"
                   >
                     Переглянути вміст
                   </Button>
                 </div>
               }
             />
            <Route path="/details" component={MainPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

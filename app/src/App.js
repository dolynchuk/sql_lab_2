import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typograpy from '@material-ui/core/Typography';
import {Switch, Route, BrowserRouter as Router, Link} from 'react-router-dom';
import MainPage from 'pages/MainPage';
import StatisticsPage from 'pages/StatisticsPage';
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
                     flexDirection: 'column',
                     width: '100%',
                     height: '100vh'
                   }}
                 >
                   <div>
                     <Button
                       component={Link}
                       to="/details"
                       color="primary"
                       variant="contained"
                     >
                       Переглянути вміст
                     </Button>
                   </div>
                   <div>
                     <Button
                       component={Link}
                       to="/statistics"
                       color="primary"
                       variant="contained"
                       style={{
                        marginTop: 16,
                       }}
                     >
                       Статистика
                     </Button>
                   </div>
                 </div>
               }
             />
            <Route path="/details" component={MainPage}/>
            <Route path="/statistics" component={StatisticsPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

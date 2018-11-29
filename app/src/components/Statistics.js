import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import List from '@material-ui/core/List/List';
import Typograpy from '@material-ui/core/Typography/Typography';
import Card from '@material-ui/core/Card';
import UsersAPI from 'services/UsersAPI';
import TextField from '@material-ui/core/TextField';
import GroupsAPI from 'services/GroupsAPI';

export default class Statistics extends Component {
  state = {
    users: [],
    groups: [],
    subscriptionsCountFilterValue: 0,
    ageFilterValue: 0,
    fullSubscribers: [],
  };

  handleSubscriptionsCountFilterValueChange = event => {
    const {value} = event.target;
    this.setState({
      subscriptionsCountFilterValue: value
    });

    UsersAPI.getUsersWithSimilarSubscriptionsCount({
      min: value
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length){
          this.setState({
            users: resp,
          });
        } else {
          this.setState({
            users: []
          });
        }
      })
  };

  handleAgeFilterValueChange = event => {
    const {value} = event.target;
    this.setState({
      ageFilterValue: value,
    });

    GroupsAPI.getGroupsWithSubscribersAgeMin({
      min: value
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length){
          this.setState({
            groups: resp,
          });
        } else {
          this.setState({
            groups: []
          });
        }
      })
  };

  componentDidMount(){
    UsersAPI.getUsersWithSimilarSubscriptionsCount({
      min: this.state.subscriptionsCountFilterValue
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length){
          this.setState({
            users: resp,
          });
        } else {
          this.setState({
            users: []
          });
        }
      });

    GroupsAPI.getGroupsWithSubscribersAgeMin({
      min: this.state.ageFilterValue
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.length){
          this.setState({
            groups: resp,
          });
        } else {
          this.setState({
            groups: []
          });
        }
      });

    UsersAPI.getFullSubscribers()
      .then(resp => resp.json())
      .then(resp => {
        if (resp){
           this.setState({
          fullSubscribers: resp,
          });
        } else {
          this.setState({
            fullSubscribers: [],
          });
        }
      });
  }

  render(){
    console.log(this.state.fullSubscribers);

    return (
      <Card
        style={{
          margin: 16,
          padding: 16,
          width: 'calc(100% - 32)',
          boxSizing: 'border-box',
        }}
      >
        <Typograpy
          color="inherit"
          variant="h5"
          gutterBottom
          style={{
            marginTop: 16,
          }}
        >
           Статистика
        </Typograpy>
        <List>
          <Typograpy
            color="inherit"
            variant="h6"
            gutterBottom
            style={{
              marginTop: 16,
            }}
          >
             Кількіть підписок мінімум
            <TextField
              value={this.state.subscriptionsCountFilterValue}
              onChange={this.handleSubscriptionsCountFilterValueChange}
              type="number"
              style={{
                marginLeft: 16,
              }}
            />
          </Typograpy>
          {
            this.state.users.map((values, index) => (
              <ListItem
                button
                key={index}
              >
                <ListItemText>
                  {values.users.join(' та ')} мають {values.count} підписок
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
        <List>
          <Typograpy
            color="inherit"
            variant="h6"
            gutterBottom
            style={{
              marginTop: 16,
            }}
          >
             Групи з користувачами старше
            <TextField
              value={this.state.ageFilterValue}
              onChange={this.handleAgeFilterValueChange}
              type="number"
              style={{
                marginLeft: 16,
              }}
            />
            років
          </Typograpy>
          {
            this.state.groups.map((value, index) => (
              <ListItem
                button
                key={index}
              >
                <ListItemText>
                  {value.name}
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
         <List>
          <Typograpy
            color="inherit"
            variant="h6"
            gutterBottom
            style={{
              marginTop: 16,
            }}
          >
             Підписники що підписані на всі групи
          </Typograpy>
          {
            this.state.fullSubscribers.map((value, index) => (
              <ListItem
                button
                key={index}
              >
                <ListItemText>
                  {value.name} {value.surname}
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Card>
    )
  }
}
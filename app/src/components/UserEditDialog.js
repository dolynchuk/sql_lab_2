import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import UsersAPI from 'services/UsersAPI';
import GroupsAPI from 'services/GroupsAPI';

export default class UserEditDialog extends Component {
  state = {
    name: '',
    surname: '',
    userId: '',
    age: '',
    groupsList: [],
    similarUsersList: [],
  };

  componentDidUpdate(prevProps){
    if (!prevProps.open && this.props.open){
      const {
        userId
      } = this.props;

      this.setState({
        name: '',
        surname: '',
        age: '',
        userId: '',
        groupsList: [],
        similarUsersList: [],
      });

      UsersAPI.getUserById({userId})
        .then(resp => resp.json())
        .then(resp => {
          this.setState({
            name: resp.name,
            surname: resp.surname,
            age: resp.age,
            userId: resp.userId
          })
        });

      GroupsAPI.getAllGroups()
        .then(resp => resp.json())
        .then(all => {
          UsersAPI.getGroupsForUser({userId})
            .then(resp => resp.json())
            .then(resp => {
              this.setState({
                groupsList: [
                  ...all.map(
                    a => resp.find(b => b.name === a.name)
                      ? {...a, checked: true}
                      : a,
                  ),
                ]
              })
            });
        });

      UsersAPI.getSimilar({userId})
        .then(resp => resp.json())
        .then(
          resp => {
            this.setState({
              similarUsersList: resp
            })
          }
        );
    }
  }

  handleUserDelete = () => {
    const {
      userId,
      onUsersChange,
    } = this.props;

    UsersAPI.deleteUser({userId})
      .then(
        () => {
          this.props.onClose();
          UsersAPI.getAllUsers()
            .then(resp => resp.json())
            .then(resp => {
               onUsersChange(
                 resp.filter(user => user.userId !== userId)
               )
            })
        }
      )
  };

  handleUpdateButtonClick = () => {
    const {
      name,
      surname,
      age,
      userId,
    } = this.state;

    const {
      onUsersChange
    } = this.props;

    UsersAPI.updateUser({
      name,
      surname,
      age,
      userId,
    }).then(
      () => {
        UsersAPI.getAllUsers()
          .then(resp => resp.json())
          .then(resp => {
            onUsersChange(resp)
          });
      }
    )
  };

  handleNameChange = event => {
    this.setState({
      name: event.target.value,
    });
  };

  handleSurnameChange = event => {
    this.setState({
      surname: event.target.value,
    });
  };

  handleAgeChange = event => {
    this.setState({
      age: event.target.value,
    });
  };

  createGroupChangeHandler = name => (
    event => {
      const {
        userId,
        onGroupsChange,
      } = this.props;

      const {
        groupsList,
      } = this.state;

      const {
        checked,
      } = event.target;

      const group = groupsList.find(
        group => group.name === name
      );

      this.setState({
        groupsList: groupsList.map(
          group => group.name === name
            ? {...group, checked}
            : group
        )
      });

      if (checked){
        GroupsAPI.subscribe({
          groupName: group.name,
          userId,
        });
      } else {
        GroupsAPI.unsubscribe({
          groupName: group.name,
          userId,
        });
      }

      GroupsAPI.getAllGroups()
        .then(resp => resp.json())
        .then(onGroupsChange)

      UsersAPI.getSimilar({userId})
        .then(resp => resp.json())
        .then(resp => {
          this.setState({
            similarUsersList: resp,
          });
        })
    }
  );

  render(){
    const {
      open,
      onClose,
    } = this.props;

    const {
      name,
      surname,
      age,
      groupsList,
      similarUsersList,
    } = this.state;

    return (
      <Dialog
        open={open}
        PaperProps={{
          style: {
            minWidth: '600px'
          }
        }}
        onClose={onClose}
      >
        <DialogTitle>
          Користувач {!!(name || surname) && `${name} ${surname}`}
          {!!age && `, вік: ${age}`}
          <IconButton
            style={{
              position: 'absolute',
              margin: 8,
              top: 0,
              right: 0,
              width: 52,
              height: 52,
              fontSize: 20,
            }}
            onClick={onClose}
          >
            <span
              role="img"
              aria-labelledby="close"
            >
              🍪
            </span>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div style={{padding: 16}}>
            <div>
              <TextField
                variant="outlined"
                placeholder="і'мя"
                value={name}
                onChange={this.handleNameChange}
                style={{
                  marginBottom: 8,
                }}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                placeholder="прізвище"
                value={surname}
                onChange={this.handleSurnameChange}
                style={{
                  marginBottom: 8,
                }}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                placeholder="вік"
                type="number"
                value={age}
                onChange={this.handleAgeChange}
                style={{
                  marginBottom: 8,
                }}
              />
            </div>
            <Button
              variant="contained"
              onClick={this.handleUpdateButtonClick}
              color="primary"
            >
              зберегти
            </Button>
          </div>
          <Divider/>
          <div>
            <Typography
              variant="h6"
              style={{
                marginTop: 16,
              }}
            >
              Групи
            </Typography>
            <List>
            {
              groupsList.map(
                (group, index) => (
                  <ListItem
                    button
                    key={index}
                  >
                    <ListItemText>
                      {group.name}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Switch
                        onChange={this.createGroupChangeHandler(group.name)}
                        checked={group.checked}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              )
            }
            <Divider/>
            </List>
            <Typography
              variant="h6"
              style={{
                marginTop: 16,
              }}
            >
              Користувачі з такими ж підписками
            </Typography>
            <List>
            {
              similarUsersList.map(
                (user, index) => (
                  <ListItem
                    button
                    key={index}
                  >
                    <ListItemText>
                      {user.name} {user.surname}
                    </ListItemText>
                  </ListItem>
                )
              )
            }
            <Divider/>
            </List>
          </div>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleUserDelete}
          >
            Видалити користувача
          </Button>
        </DialogContent>
      </Dialog>
    )
  }
}

import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import UsersAPI from 'services/UsersAPI';
import GroupsAPI from 'services/GroupsAPI';

export default class UserEditDialog extends Component {
  state = {
    name: '',
    groupId: '',
    usersList: [],
  };

  componentDidUpdate(prevProps){
    if (!prevProps.open && this.props.open){
      const {
        groupId
      } = this.props;

      this.setState({
        name: '',
        groupId: '',
        usersList: [],
      });

      GroupsAPI.getGroupById({groupId})
        .then(resp => resp.json())
        .then(resp => {
          this.setState({
            name: resp.name,
            groupId: resp.groupId
          })
        });

        GroupsAPI.getUsersForGroup({groupId})
          .then(resp => resp.json())
          .then(resp => (
            this.setState({
              usersList: resp,
            })
          ));
    }
  }

  handleGroupDelete = () => {
    const {
      groupId,
      onGroupsChange,
    } = this.props;

    GroupsAPI.deleteGroup({groupId})
      .then(
        () => {
          this.props.onClose();
          GroupsAPI.getAllGroups()
            .then(resp => resp.json())
            .then(resp => {
               onGroupsChange(
                 resp.filter(group => group.groupId !== groupId)
               )
            })
        }
      )
  };

  handleUpdateButtonClick = () => {
    const {
      groupId,
      name,
    } = this.state;

    const {
      onGroupsChange
    } = this.props;

    GroupsAPI.updateGroup({
      groupId,
      name,
    }).then(
      () => {
        GroupsAPI.getAllGroups()
          .then(resp => resp.json())
          .then(resp => {
            onGroupsChange(resp)
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

  render(){
    const {
      open,
      onClose,
    } = this.props;

    const {
      name,
      usersList,
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
          Спільнота {!!name && `${name}`}
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
              Користувачі
            </Typography>
            <List>
            {
              usersList.length ?
                usersList.map(
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
                : (
                  <ListItem>
                    <ListItemText>
                      Пусто. Підписатись можна в діалозі редагування користувача
                    </ListItemText>
                  </ListItem>
                )
            }
             <Divider/>
            </List>
          </div>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleGroupDelete}
          >
            Видалити спільноту
          </Button>
        </DialogContent>
      </Dialog>
    )
  }
}

import React, {Component} from 'react';
import Card from '@material-ui/core/Paper/Paper';
import Typograpy from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TextField from '@material-ui/core/TextField';
import API from '../API';

export default class extends Component {
  state = {
    users: [],
    groups: [],
    userAddActive: false,
    groupAddActive: false,
    newUser: {
      name: '',
      surname: '',
      age: 0,
    },
    newGroup: {
      name: '',
    },
  };

  createFieldChangeHandler = (firstlevel, nextlevel) => (
    (event) => {
      this.setState({
        [firstlevel]: {
          ...this.state[firstlevel],
          [nextlevel]: event.target.value
        }
      })
    }
  );

  componentDidMount(){
    API.getAllUsers()
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          users: resp,
        })
      });

    API.getAllGroups()
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          groups: resp,
        })
      });
  }

  render(){
    const {
      users,
      groups,
      userAddActive,
      groupAddActive,
      newUser,
      newGroup,
    } = this.state;

    return (
      <div>
        <Card
          style={{
            margin: 16,
            padding: 16,
            width: 'calc(100% - 32)',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typograpy variant="h5" color="inherit">
              Користувачі
            </Typograpy>
            <Button
              variant="fab"
              color="primary"
              onClick={() => {
                this.setState({userAddActive: true})
              }}
            >
              +
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>user_id</TableCell>
                <TableCell>Ім'я</TableCell>
                <TableCell>Прізвище</TableCell>
                <TableCell>Вік</TableCell>
                <TableCell>__</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users.map(
                  (row, key) => (
                    <TableRow key={key}>
                      <TableCell>{row.user_id}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                       <TableCell component="th" scope="row">
                        {row.surname}
                      </TableCell>
                       <TableCell component="th" scope="row">
                        {row.age}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                        >
                          Опції
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              }
              {
                userAddActive && (
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        variant="outlined"
                        value={newUser.name}
                        onChange={this.createFieldChangeHandler('newUser', 'name')}
                      />
                    </TableCell>
                     <TableCell component="th" scope="row">
                       <TextField
                         variant="outlined"
                         value={newUser.surname}
                         onChange={this.createFieldChangeHandler('newUser', 'surname')}
                       />
                    </TableCell>
                     <TableCell component="th" scope="row">
                       <TextField
                         variant="outlined"
                         type="number"
                         value={newUser.age}
                         onChange={this.createFieldChangeHandler('newUser', 'age')}
                       />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                      >
                        Додати
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </Card>
        <Card
          style={{
            margin: 16,
            padding: 16,
            width: 'calc(100% - 32)',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typograpy variant="h5" color="inherit">
              Спільноти
            </Typograpy>
            <Button
              variant="fab"
              color="primary"
              onClick={() => {
                this.setState({groupAddActive: true})
              }}
            >
              +
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>group_id</TableCell>
                <TableCell>name</TableCell>
                <TableCell>к-ть користувачів</TableCell>
                <TableCell>_</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                groups.map(
                  (row, key) => (
                    <TableRow key={key}>
                      <TableCell>{row.group_id}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                       <TableCell component="th" scope="row">
                        {row.users_count}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                        >
                          Опції
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              }
              {
                groupAddActive && (
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        variant="outlined"
                        value={newGroup.name}
                        onChange={this.createFieldChangeHandler('newGroup', 'name')}
                      />
                    </TableCell>
                    <TableCell>__</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                      >
                        Додати
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  }
}
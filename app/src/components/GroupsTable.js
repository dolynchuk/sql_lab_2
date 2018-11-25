import React, {Component} from 'react';
import Card from '@material-ui/core/Paper/Paper';
import Typograpy from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TextField from '@material-ui/core/TextField/TextField';
import API from 'services/GroupsAPI';

export default class extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.getAllGroups();
  }

  getAllGroups = () => {
    const {
      onGroupsChange
    } = this.props;

    API.getAllGroups()
      .then(resp => resp.json())
      .then(onGroupsChange);
  };

  handleGroupAddClick = () => {
    const {
      onGroupsChange,
      groups
    } = this.props;

    const {
      name,
    } = this.state;

    if (!name){
      return alert('заповніть всі поля !');
    }

    this.setState({
      name: '',
    });

    onGroupsChange([
      ...groups,
      {
        name,
        groupId: null
      }
    ]);

    API.addGroup({
      name,
    }).then(this.getAllGroups)
  };

  createFieldChangeHandler = fieldName => (
    event => {
      this.setState({
        [fieldName]: event.target.value,
      })
    }
  );

  render(){
    const {
      groups,
      createGroupEditDialogOpen,
    } = this.props;

    const {
      name
    } = this.state;

    return (
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
          <Typograpy
            variant="h5"
            color="inherit"
          >
            Спільноти
          </Typograpy>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ідентифікатор</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>К-ть користувачів</TableCell>
              <TableCell>опції</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              groups.map(
                (row, key) => (
                  <TableRow key={key}>
                    <TableCell>{row.groupId}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                     <TableCell component="th" scope="row">
                      {row.usersCount}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={createGroupEditDialogOpen(row.groupId)}
                        style={{
                          fontSize: 25,
                        }}
                      >
                        <span
                          role="img"
                          aria-labelledby="settings"
                        >
                          ⚙️
                        </span>️
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            }
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  value={name}
                  onChange={this.createFieldChangeHandler('name')}
                  placeholder="Назва"
                />
              </TableCell>
              <TableCell/>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleGroupAddClick}
                  style={{
                    fontSize: 25,
                  }}
                >
                  +
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  }
}

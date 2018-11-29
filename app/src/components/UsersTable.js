import React, {Component} from 'react';
import Card from '@material-ui/core/Paper/Paper';
import Typograpy from '@material-ui/core/Typography/Typography';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TextField from '@material-ui/core/TextField/TextField';
import UsersAPI from 'services/UsersAPI';
import Select from '@material-ui/core/Select';

export default class extends Component {
  state = {
    name: '',
    surname: '',
    age: '',
    cityId: '',
    genderId: '',
    cities: [],
    genders: [],
  };

  componentDidMount() {
    this.getAllUsers();
    this.getCities();
    this.getGenders();
  }

  getCities = () => {
     UsersAPI.getCities()
       .then(resp => resp.json())
       .then(resp => {
         this.setState({
           cities: resp,
         })
       });
  };

  getGenders = () => {
    UsersAPI.getGenders()
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          genders: resp,
        })
      });
  };

  getAllUsers = () => {
    const {
      onUsersChange
    } = this.props;

    UsersAPI.getAllUsers()
      .then(resp => resp.json())
      .then(onUsersChange);
  };

  handleUserAddClick = () => {
    const {
      onUsersChange,
      users,
    } = this.props;

    const {
      name,
      surname,
      age,
      cityId,
      genderId,
    } = this.state;

    if (!name || !surname || !age || !cityId || !genderId){
      return alert('заповніть всі поля !');
    }

    onUsersChange([
      ...users,
      {
        name,
        surname,
        age,
        cityId,
        genderId,
        userId: null
      }
    ]);

    this.setState({
      name: '',
      surname: '',
      age: '',
      cityId: '',
      genderId: '',
    });

    UsersAPI.addUser({
      name,
      surname,
      age,
      cityId,
      genderId,
    }).then(this.getAllUsers)
  };

  createFieldChangeHandler = field => (
    event => {
      this.setState({
        [field]: event.target.value,
      })
    }
  );

  render(){
    const {
      users,
      createUserEditDialogOpen,
    } = this.props;

    const {
      name,
      surname,
      age,
      cityId,
      genderId,
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
            Користувачі
          </Typograpy>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ідентифікатор</TableCell>
              <TableCell>Ім'я</TableCell>
              <TableCell>Прізвище</TableCell>
              <TableCell>Вік</TableCell>
              <TableCell>Місто</TableCell>
              <TableCell>Гендер</TableCell>
              <TableCell>Опції</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map(
                (row, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      {row.userId}
                    </TableCell>
                    <TableCell>
                      {row.name}
                    </TableCell>
                     <TableCell>
                      {row.surname}
                    </TableCell>
                     <TableCell>
                      {row.age}
                    </TableCell>
                    <TableCell>
                       {this.state.cities[row.cityId - 1]}
                    </TableCell>
                     <TableCell>
                       {this.state.genders[row.genderId - 1]}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        style={{
                          fontSize: 25,
                          width: 56,
                          height: 56,
                        }}
                        onClick={createUserEditDialogOpen(row.userId)}
                      >
                        <span
                          role="img"
                          aria-labelledby="settings"
                        >
                          ⚙️
                        </span>
                      </IconButton>
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
                  placeholder="ім'я"
                />
              </TableCell>
               <TableCell>
                 <TextField
                   variant="outlined"
                   value={surname}
                   onChange={this.createFieldChangeHandler('surname')}
                   placeholder="прізвище"
                 />
              </TableCell>
               <TableCell>
                 <TextField
                   variant="outlined"
                   type="number"
                   value={age}
                   onChange={this.createFieldChangeHandler('age')}
                   placeholder="вік"
                 />
              </TableCell>
              <TableCell>
                <Select
                  variant="outlined"
                  value={cityId}
                  onChange={this.createFieldChangeHandler('cityId')}
                >
                  {
                    this.state.cities.map((city, index) => (
                      <option value={index + 1} key={index}>{city}</option>
                    ))
                  }
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  variant="outlined"
                  value={genderId}
                  onChange={this.createFieldChangeHandler('genderId')}
                >
                  {
                    this.state.genders.map((gender, index) => (
                      <option value={index + 1} key={index}>{gender}</option>
                    ))
                  }
                </Select>
              </TableCell>
              <TableCell>
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={this.handleUserAddClick}
                  style={{
                    fontSize: 25,
                    width: 56,
                    height: 56,
                  }}
                >
                  +
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  }
}

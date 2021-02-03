import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Clear from "./components/layout/Clear";
import Alert from './components/layout/Alert'
import Users from './components/users/Users';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data.items, loading: false });
  // } 
  // Search for github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false,  alert: null});
  };

  clearUsers = () => {
    this.setState({users: []})
  }

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert
          alert={this.state.alert}
          />
          <Search 
          setAlert={this.setAlert}
          searchUsers={this.searchUsers}
          />
          <Clear
          users={this.state.users}
          clearUsers={this.clearUsers}
          />
          <Users
          loading={this.state.loading}
          users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default App;

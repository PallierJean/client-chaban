import React, { Component } from 'react';
import '../styles/app.css';
import Search from '../components/search';
import List from '../components/list';
import {ProgressBar} from 'react-materialize'

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infos: []
    };
    this.infoListWithFilter = this.infoListWithFilter.bind(this);
  }

  componentDidMount() {
    this.infoList();
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  infoList() {
    fetch('http://localhost:3000/')
    .then(this.handleErrors)
    .then(res => res.json())
    .then(res => this.setState({ infos: res }))
    .catch(function(error) {
        console.log(error);
    });
  }

  infoListWithFilter(start, end) {
    fetch("http://localhost:3000/?from="+start+"&to="+end)
    .then(this.handleErrors)
    .then(res => res.json())
    .then(res => this.setState({ infos: res }))
    .catch(function(error) {
        console.log(error);
    });
  }

  render() {
    return (
      <div className="content">
        <div className="title"><h1>API Chaban</h1></div>
        <hr/>
        <Search datechange={this.infoListWithFilter}/>
        {!this.state.infos.length ? <ProgressBar/> : <List infos={this.state.infos}/>}
      </div>
    );
  }
}

export default HomePage;

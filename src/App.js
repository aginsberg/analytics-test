import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      mediumValue: '',
      sourceValue: ''
    };

    this.handleChangeMedium = this.handleChangeMedium.bind(this);
    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMedium(event) {
    this.setState({mediumValue: event.target.value});
  }

  handleChangeSource(event) {
    this.setState({sourceValue: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    window.ga('set', 'campaignMedium', this.state.mediumValue);
    window.ga('set', 'campaignSource', this.state.sourceValue);
    console.log(window.ga('get', 'campaignContent', 'content'))
    window.ga('send', 'pageview');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">UTM Setter</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label>
            Medium_UTM
            <input type="text" value={this.state.mediumValue} onChange={this.handleChangeMedium} />
          </label>
          <label>
            Source_UTM
            <input type="text" value={this.state.sourceValue} onChange={this.handleChangeSource} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;

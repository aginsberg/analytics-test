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
    event.preventDefault();
    window.ga('set', 'campaignMedium', this.state.mediumValue);
    window.ga('set', 'campaignSource', this.state.sourceValue);
    window.ga('send', 'pageview');
    console.log(`Page View Fired with Source: ${this.state.sourceValue}, Medium: ${this.state.mediumValue}`);
  }

  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <h1 className="App-title">Google Analytics Playground, Site1</h1>
          <h4 className="App-title">Fill out the form below to set the UTM Source/Medium</h4>
        </header>

        <div className="Form-wrapper">

          <div className="Form-descriptionWrapper">
            <p className="Form-description">
              Submitting this form will set the UTM Source/Medium values and immediately fire a 'pageview' event.
            </p>
            <p className="Form-description">
              Results available in developer console.
            </p>
          </div>

          <form onSubmit={this.handleSubmit} className="Form-utm">
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

        <div className="Switch-wrapper">
          <p className="Switch-description">
            Pressing this button will add UTM Source/Medium query params to any outbound links on the page.
          </p>
          <div className="Switch-buttonWrapper">
            <button className="Switch-button" onClick={() => {
              let links = document.getElementsByTagName('a');
              for (let i = 0; i < links.length; i++) {
                if (links[i].href.indexOf(window.location.host == -1)) {
                  links[i].href += '?utm_source=Yext&utm_medium=Pages'
                }
              }
            }}>Add Query Params</button>
          </div>
        </div>

        <a href="https://gracious-heisenberg-7e5f01.netlify.com/">Other Site</a>

        <div className="README-wrapper">
            <p className="README-text">
              This site is meant to be used along with site2 (linked above) to test enhancing client's Google Analytics to more strongly represent the traffic
              their Yext Pages are driving towards their corporate page. The 2 ways we can set the UTM Source/Medium is via analytics.js and with query params.
            </p>

            <h4 className="README-title">
              Analytics.js
            </h4>
            <p className="README-text">
              By filling out the form and submitting, analytics will set the UTM_Source and UTM_Medium via 'ga('set', 'campaignMedium', [value])' and 
              'ga('set', 'campaignSource', [value])'. Immediately after setting it, a pageview event will be fired, which can be seen in the analytics console for
              the page.
            </p>

            <h4 className="README-title">
              Query Params
            </h4>
            <p className="README-text">
              Pressing the query params run a function that searches for all outbound links on the page and appends params for Source/Medium to the end of the url.
              This will cause the params (Yext, Pages) to appear as the Source/Medium for the traffic.
            </p>
        </div>

      </div>
    );
  }
}

export default App;

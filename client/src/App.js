import React, { Component } from "react";
import "./App.css";
import validUrl from "valid-url";
import axios from "axios";
import qs from "qs";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: "http://",
      emojis: [],
      error: {
        status: false,
        message: ""
      },
      step: 1
    };
  }

  onChange(e) {
    if (this.state.step !== 2) {
      this.setState({
        step: 2
      });
    }

    this.setState({
      url: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let url = this.state.url;

    if (validUrl.isUri(url)) {
      if (url.includes("https://")) {
        url = url.replace("https://", "");
      } else if (url.includes("http://")) {
        url = url.replace("http://", "");
      }

      axios({
        method: "post",
        url: "http://206.189.205.219:3000/api/redirect",
        data: qs.stringify({ url: url }),
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.record_created === false) {
            this.setState({
              error: { status: true, message: "Could not validate URL" },
              url: "http://"
            });
            return;
          }
          this.setState({
            emojis: res.data.emojis,
            error: { status: false, message: "" }
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      return false;
    }
  }

  onBlur() {
    this.setState({
      step: 3
    });
  }

  render() {
    const emojis = (
      <a
        target="_blank"
        href={`http://206.189.205.219:3000/${this.state.emojis.join("")}`}
      >{`http://206.189.205.219:3000/${this.state.emojis.join("")}`}</a>
    );
    return (
      <div className="container grid-lg">
        <header>
          <h1>Emoj.Us</h1>
          <h2>Make your URLs fabulous</h2>
        </header>
        <p>How to use:</p>
        <ul className="step">
          <li
            className={this.state.step === 1 ? "step-item active" : "step-item"}
          >
            <a
              href="#!"
              className="tooltip"
              data-tooltip="Enter a valid URL with the http:// or https:// prefix"
            >
              Enter your URL
            </a>
          </li>
          <li
            className={this.state.step === 2 ? "step-item active" : "step-item"}
          >
            <a
              href="#!"
              className="tooltip"
              data-tooltip="Click the button or hit enter to emojify"
            >
              Emojify
            </a>
          </li>
          <li
            className={this.state.step === 3 ? "step-item active" : "step-item"}
          >
            <a href="#!" className="tooltip" data-tooltip="Spread the joy!">
              Share!
            </a>
          </li>
        </ul>

        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            onBlur={() => this.onBlur()}
            type="text"
            name="url"
            id="url"
            value={this.state.url}
          />
          <input
            className={"btn btn-primary bg-secondary"}
            type="submit"
            value="Emojify!"
          />
        </form>
        <p className="emoji-link">
          {this.state.error.status ? this.state.error.message : emojis}
        </p>
      </div>
    );
  }
}

export default App;

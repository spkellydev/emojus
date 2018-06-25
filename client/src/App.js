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
      }
    };
  }

  onChange(e) {
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
        url: "http://localhost:4000/api/redirect",
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

  render() {
    const emojis = (
      <a
        target="_blank"
        href={`http://localhost:4000/${this.state.emojis.join("")}`}
      >{`http://localhost:4000/${this.state.emojis.join("")}`}</a>
    );
    return (
      <div>
        <header>
          <h1>Emoj.Us</h1>
          <h2>Make your URLs fabulous</h2>
        </header>
        <p>How to use:</p>
        <ol>
          <li>Enter URL</li>
          <li>Get Emojified version of URL</li>
          <li>Share!</li>
        </ol>
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            type="text"
            name="url"
            id="url"
            value={this.state.url}
          />
        </form>
        <p>{this.state.error.status ? this.state.error.message : emojis}</p>
      </div>
    );
  }
}

export default App;

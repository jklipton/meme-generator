import React, { Component } from 'react';

export default class App extends Component {

  constructor() {
    super();

    this.state = { 

    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleBackground = this.handleBackground.bind(this);

  }

  handleImageSrc({ target }) {
    this.setState({ image: target.value });
  }

  handleUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    const temp = document.querySelector('#meme-text');
    temp.parentNode.removeChild(temp);
    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  }

  handleText({ target }) {
    this.setState({ text: target.value });
  }

  handleBackground({ target }) {
    this.setState({
      background: target.value
    });
  }

  render() {
    
    const { text, background } = this.state;
    return (
      <main>
        <section id="intro">
          <h1> Meme Generator </h1>
          <h4>You want to make a meme?  Add your picture and add your text below.  When you're ready, click the 'Download' button to save your creation.</h4>
        </section>
        <section id="form">
          <div className="form-group">
            <label>
              File path:
              <input type="text" onChange={event => this.handleImageSrc(event)}/>
            </label>
          </div>
          <div id="upload" className="form-group">
            Or upload:
            <label>
              <input type="file" className="inputfile" onChange={event => this.handleUpload(event)}/>
              Choose a file
            </label>
          </div>
          <div className="form-group">
            <label>
              Meme text:
              <input type="text" onChange={event => this.handleText(event)}/>
            </label>
          </div>
        </section>
        <section id="meme" style={{backgroundImage: background ? `url(${background})` : null}}>
          <div id="meme-text">Your meme will appear here!</div>
          <h5>{text}</h5>
        </section>
      </main>
    );
  }

}
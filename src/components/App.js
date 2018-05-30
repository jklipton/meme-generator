import React, { Component } from 'react';

export default class App extends Component {

  constructor() {
    super();

    this.state = { 
      image: null,
      text: '',
    };

    this.handleUpload = this.handleUpload.bind(this);

  }

  handleImageSrc({ target }) {
    this.setState({ image: target.value });
  }

  handleUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    document.querySelector('#meme-text').innerHTML = '';
    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  }

  handleText({ target }) {
    this.setState({ text: target.value });
  }

  render() {
    
    const { image, text } = this.state;
    return (
      <main>
        <section id="intro">
          <h1> Meme Generator </h1>
          <h4>You want to make a meme?  Upload your picture and add your text below.  When you're ready, click the 'Download' button to save your creation.</h4>
        </section>
        <section id="form">
          <label>
              File path:
            <input onChange={event => this.handleImageSrc(event)}/>
          </label>
          <label>
              Or upload:
            <input 
              type="file" 
              onChange={event => this.handleUpload(event)}
            />
          </label>
          <label>
              Meme text:
            <input type="text" onChange={event => this.handleText(event)}/>
          </label>
        </section>
        <section id="meme">
          <div id="meme-text">Your meme will appear here!</div>
          <h5>{text}</h5>
          <img src={image}/>
        </section>
      </main>
    );
  }

}
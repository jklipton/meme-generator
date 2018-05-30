import React, { Component } from 'react';

export default class App extends Component {

  constructor() {
    super();

    this.state = { 
      image: null
    };
    this.handleUpload = this.handleUpload.bind(this);

  }

  handleImageSrc({ target }) {
    this.setState({ image: target.value });
  }

  handleUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  }

  render() {
    
    const { image } = this.state;
    return (
      <main>
        <div>
          <label>
              Image Src:
            <input onChange={event => this.handleImageSrc(event)}/>
          </label>
        </div>
        <div>
          <label>
              Image:
            <input 
              type="file" 
              onChange={event => this.handleUpload(event)}
            />
          </label>
        </div>
        <h1>What an image!</h1>
        <img src={image}/>
      </main>
    );
  }

}
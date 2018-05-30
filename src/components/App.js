import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      fonts: ['Impact', 'Arial', 'Caveat'],
      selectedFont: 'Impact',
      image: null,
      fontColor: '#ffffff'
    };

    this.handleImageSrc = this.handleImageSrc.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.handleHeader = this.handleHeader.bind(this);
    this.handleFooter = this.handleFooter.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);

  }

  handleMemeBox() {
    const temp = document.querySelector('#intro-text');
    temp.parentNode.removeChild(temp);

    const memeBox = document.querySelector('#meme');
    memeBox.setAttribute('style', 'border: none');
    memeBox.lastChild.setAttribute('style', 'visibility: visible');
  }

  handleImageSrc({ target }) {
    this.setState({ image: target.value });
    this.handleMemeBox();
  }

  handleUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result });
    };

    this.handleMemeBox();
  }

  handleHeader({ target }) {
    this.setState({ header: target.value });
  }

  handleFooter({ target }) {
    this.setState({ footer: target.value });
  }

  handleFontChange({ target }) {
    this.setState({ selectedFont: target.value });
    const memeText = document.querySelectorAll('.meme-text');
    memeText.forEach((node) => {
      node.setAttribute('style', `font-family:${target.value}`);
    });
  }

  handleColorChange({ target }) {
    this.setState({ fontColor: target.value });
  }

  handleExport() {
    dom2image.toBlob(this.section).then(blob => {
      fileSaver.saveAs(blob, 'meme.png');
    });
  }

  render() {
    
    const { header, footer, image, selectedFont, fonts, fontColor } = this.state;

    return (
      <main>
        <section id="intro">
          <h1> Meme Generator </h1>
          <h4>You want to make a meme?  Add your picture and add your text below.  When you're ready, click the 'Save' button to save your creation.</h4>
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
              Header text:
              <input type="text" onChange={event => this.handleHeader(event)}/>
            </label>
          </div>
          <div className="form-group">
            <label>
              Footer text:
              <input type="text" onChange={event => this.handleFooter(event)}/>
            </label>
          </div>
          <div className="form-group">
            <select value={ selectedFont } onChange={event => this.handleFontChange(event)}>
              { fonts.map(font => <option key={font}>{font}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>
              Font Color:
              <input type="color" value={fontColor} onChange={event => this.handleColorChange(event)}/>
            </label>
          </div>
        </section>
        <section id="meme" ref={node => this.section = node }>
          <div id="intro-text">Your meme will appear here!</div>
          <div id="header-text" className="meme-text" style={{ color: fontColor }}>{ header }</div>
          <div id="footer-text" className="meme-text" style={{ color: fontColor }}>{ footer }</div>
          <img src={image}/>
        </section>
        <section id="submit">
          <button onClick={this.handleExport}>Save!</button>
        </section>
      </main>
    );
  }

}
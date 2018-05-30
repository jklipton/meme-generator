import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import WebFont from 'webfontloader';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      fonts: {
        'Impact' : ['Impact', 'Arial Narrow Bold', 'sans-serif'],
        'Arial' : ['Arial', 'Helvetica', 'sans-serif'],
        'Caveat' : ['Caveat', 'cursive'],
        'Roboto' : ['Roboto', 'sans-serif'],
        'IM Fell Great Primer' : ['IM Fell Great Primer', 'serif'],
        'Bangers' : ['Bangers', 'cursive'],
        'Source Sans Pro' : ['Source Sans Pro', 'sans-serif'],
      },
      selectedFontKey: 'Impact',
      selectedFontData: ['Impact', 'Arial Narrow Bold', 'sans-serif'],
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

  fontLoader(fontKey) {
    if(fontKey === 'Impact' || fontKey === 'Arial') return; 
    WebFont.load({
      google: {
        families: [`${fontKey}`]
      }
    });
  }

  handleFontChange({ target }) {

    this.setState({
      selectedFontKey: target.value,
      selectedFontData: this.state.fonts[`${target.value}`]
    });

    this.fontLoader(target.value);
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
    
    const { header, footer, image, selectedFontKey, selectedFontData, fonts, fontColor } = this.state;
    const memeStyle = {
      color: fontColor, 
      fontFamily: selectedFontData,
    };

    return (
      <main>
        <section id="intro">
          <h1> Meme Generator </h1>
          <h4>You want to make a meme?  Add your picture and add your text below.  When you&apos;re ready, click the &apos;Save&apos; button to save your creation.</h4>
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
            <label id="font-select">
              Font:
              <div id="styled-select">
                <select value={ selectedFontKey } onChange={event => this.handleFontChange(event)}>
                  { Object.keys(fonts).map(font => <option key={font}>{font}</option>)}
                </select>
              </div>
            </label>
          </div>
          <div className="form-group">
            <label id="color-select">
              Font Color:
              <input type="color" value={fontColor} onChange={event => this.handleColorChange(event)}/>
            </label>
          </div>
        </section>
        <section id="meme" ref={node => this.section = node }>
          <div id="intro-text">Your meme will appear here!</div>
          <div id="header-text" className="meme-text" style={ memeStyle }>{ header }</div>
          <div id="footer-text" className="meme-text" style={ memeStyle }>{ footer }</div>
          <img src={image}/>
        </section>
        <section id="submit">
          <button onClick={this.handleExport}>Save!</button>
        </section>
      </main>
    );
  }

}
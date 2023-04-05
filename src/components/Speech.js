import React, { Component } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

class Speech extends Component {
  constructor(props) {
    super(props);

    this.button = React.createRef();
  }

  componentDidMount = () => {
    this.button.current.click();
  };

  checkClick = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div>
        <a
          href="https://www.youtube.com/"
          ref={this.button}
          onClick={this.checkClick()}
        >
          Click me!
        </a>
      </div>
    );
  }
}

export default Speech;
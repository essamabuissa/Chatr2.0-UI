import React, { Component } from "react";
import { connect } from "react-redux";
import { postMessage } from "../redux/actions";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const styles = {
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
};

const stylings = ["bold", "italic", "underline"];

class MessageForm extends Component {
  state = {
    message: "",
    emojiPickerState: false,
    color: "black",
    bold: false,
    italic: false,
    underline: false,
  };

  setColor = (color) => this.setState({ color });

  setBold = () => {
    const newBold = !this.state.bold;
    this.setState({ bold: newBold });
  };
  setItalic = () => {
    const newItalic = !this.state.itlaic;
    this.setState({ italic: newItalic });
  };
  setUnderline = () => {
    const newUnderline = !this.state.underline;
    this.setState({ underline: newUnderline });
  };
  setStyle = (style) => {
    const newStyle = !this.state[style];
    this.setState({ [style]: newStyle });
  };

  submitMessage = (e) => {
    console.log("text");
    e.preventDefault();
    this.props.postMessage(this.state, this.props.channelID);
    this.setState({ message: "" });
  };

  triggerEmojiPicker = (event) => {
    event.preventDefault();
    console.log("emoji");
    this.setState({ emojiPickerState: true });
  };

  render() {
    const stylingBoxes = stylings.map((style) => (
      <button
        className={`nav-link ${this.state[style]}`}
        style={styles[style]}
        key={style}
        onClick={() => this.setStyle(style)}
      >
        {style}
      </button>
    ));

    return (
      <div className="container-fluid mt-2">
        {" "}
        <form className="col-11 mx-auto" onSubmit={this.submitMessage}>
          <textarea
            className="form-control"
            style={{
              color: this.state.color,
              fontWeight: this.state.bold && "bold",
              fontStyle: this.state.italic && "italic",
              textDecorationLine: this.state.underline && "underline",
            }}
            rows="2"
            placeholder="Type your message here"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
            onKeyUp={(e) => {
              if (!e.shiftKey && e.key === "Enter") this.submitMessage(e); //If the user press Shitf+Enter the form will not submit , if he uses "Enter" the form will submit
            }}
          />
        </form>
        <button>
          <span
            className="nav-link"
            id="emoji"
            onClick={() =>
              this.setState((prevState) => ({
                emojiPickerState: !prevState.emojiPickerState,
              }))
            }
            role="img"
            aria-label=""
          >
            😁
          </span>
        </button>
        {this.state.emojiPickerState && (
          <Picker
            onSelect={(emoji) =>
              this.setState({ message: this.state.message + emoji.native })
            }
          />
        )}
        <div>{stylingBoxes.slice()}</div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message, channelID) =>
      dispatch(postMessage(message, channelID)),
  };
};

export default connect(null, mapDispatchToProps)(MessageForm);

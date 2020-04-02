import React, { Component } from "react";
import { connect } from "react-redux";
import { postMessage } from "../redux/actions";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class MessageForm extends Component {
  state = {
    message: "",
    emojiPickerState: false
  };

  submitMessage = e => {
    console.log("text"); // <-- don't commit console logs
    e.preventDefault();
    this.props.postMessage(this.state, this.props.channelID);
    this.setState({ message: "" });
  };

  triggerEmojiPicker = event => {
    event.preventDefault();
    console.log("emoji"); // <-- don't commit console logs
    this.setState({ emojiPickerState: true });
  };

  render() {
    return (
      <div className="container-fluid">
        <form className="col-11 mx-auto" onSubmit={this.submitMessage}>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Type your message here"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyUp={e => {
              if (!e.shiftKey && e.key === "Enter") this.submitMessage(e); //If the user press Shitf+Enter the form will not submit , if he uses "Enter" the form will submit
            }}
          />
          {this.state.emojiPickerState ? (
            <Picker
              title="Pick your emoji…"
              emoji="point_up"
              onSelect={emoji =>
                this.setState({
                  message: this.state.message + emoji.native
                  // emojiPickerState: false   ?
                })
              }
            />
          ) : (
            this.setState({ emojiPickerState: false }) // <-- what does this even do? If there's not "else" then just use `&&`
          )}
        </form>
        <button
          className="ma4 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          onClick={this.triggerEmojiPicker}
        >
          <span role="img" aria-label="">
            😁
          </span>
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, channelID) =>
      dispatch(postMessage(message, channelID))
  };
};

export default connect(null, mapDispatchToProps)(MessageForm);

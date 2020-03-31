import React, { Component } from "react";
import { connect } from "react-redux";

class MessageForm extends Component {
  state = {
    message: ""
  };

  submitMessage = event => {
    event.PreventDefault();
    if (this.state.message) {
      postMessage(this.state, this.props.channel.id, this.resetForm);
    }
  };
  resetForm = () => this.setState({ message: "" });

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
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMessage: newMessage => dispatch(postMessage(newMessage))
  };
};

export default connect(null, mapDispatchToProps)(MessageForm);

import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { postChannel } from "../redux/actions";
import { Redirect } from "react-router-dom";

class CreateChannelForm extends Component {
  state = {
    name: "",
    image_url: "",
    done: false
  };

  submitChannel = event => {
    event.preventDefault();
    this.props.postChannel(this.state);
    this.setState({ done: true });
  };

  componentDidMount() {
    this.setState({ done: false });
  }

  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitChannel}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Channel Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.onTextchange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="image_url"
              onChange={this.onTextchange}
            />
          </div>
          <input type="submit" />
        </form>
        {/* Instead of doing this, you should be sending `history` to `postChannel` and using it to redirect AFTER successful post */}
        {/* Also, that way you can redirect the user to the channel they just created */}
        {this.state.done && <Redirect to="/private" />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postChannel: newChannel => dispatch(postChannel(newChannel))
  };
};

export default connect(null, mapDispatchToProps)(CreateChannelForm);

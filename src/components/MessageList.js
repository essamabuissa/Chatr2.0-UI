import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages } from "../redux/actions/messages";

class MessageList extends Component {
  state = {
    channel: null,
    interval: null
  };

  componentDidMount = () => {};

  render() {
    return <div></div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channel => dispatch(fetchMessages(channel))
  };
};
export default connect(null, mapDispatchToProps)(MessageList);

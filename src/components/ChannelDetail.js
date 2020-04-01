import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Loading from "./Loading";
import MessageForm from "./MessageForm";

import { fetchMessages } from "../redux/actions";
import { setLoading } from "../redux/actions/loading";

class ChannelDetail extends Component {
  interval = null;
  componentDidMount(interval) {
    interval = setInterval(
      () => (
        this.props.fetchMessages(this.props.match.params.channelID),
        console.log("didmount")
      ),
      1500
    );
  }

  componentDidUpdate = (previousProps, interval) => {
    if (
      this.props.match.params.channelID !== previousProps.match.params.channelID
    ) {
      clearInterval(interval);

      interval = setInterval(
        () => (
          this.props.fetchMessages(this.props.match.params.channelID),
          console.log("didupdate")
        ),
        1500
      );
    }
  };

  componentWillUnmount = interval => {
    console.log("willunmount");

    clearInterval(interval);
  };

  render() {
    if (this.props.loading) return <Loading />;
    const { channelID } = this.props.match.params;
    console.log(channelID);
    const channel = this.props.channels.find(
      channel => channel.id === +channelID
    );

    const channelName = `${channel.name}`;
    const MessageList = this.props.messages.map(message => (
      <article className="comment">
        <div>
          <a className="comment-img" href={channelName}>
            <img src={channel.image_url} alt="" width="50" height="50" />
          </a>
        </div>
        <div className="comment-body">
          <div className="msg_cotainer">{message.message}</div>
          <p className="attribution">
            by <a href="#non">{message.username}</a> at {message.timestamp}
          </p>
        </div>
      </article>
    ));
    console.log(this.props.messages);

    return (
      <div className="container text-center my-auto z-1">
        <center>
          <div className="channel">
            <div>
              <h3>{channelName}</h3> <h6>owner: {channel.owner}</h6>
              <img
                src={channel.image_url}
                className="img-thumbnail img-fluid"
                alt={channelName}
              />
            </div>
            <MessageForm channelID={channel.id} />
            <section className="comments">{MessageList}</section>
          </div>{" "}
        </center>
      </div>
    );
  }
}
const mapStateToProps = ({ channels, messages }) => {
  return {
    channels,
    messages,
    loading: !channels.length || !messages.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID => dispatch(fetchMessages(channelID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);

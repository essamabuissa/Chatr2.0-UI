import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Loading from "./Loading";
import MessageForm from "./MessageForm";
import Message from "./Message";

//Actions
import { fetchMessages, refreshMessages } from "../redux/actions";
import { CLEAR_MESSAGES } from "../redux/actions/actionTypes";

class ChannelDetail extends Component {
  interval = setInterval(
    () => this.props.fetchMessages(this.props.match.params.channelID),
    2500
  );

  componentDidUpdate = (previousProps) => {
    if (
      this.props.match.params.channelID !== previousProps.match.params.channelID
    ) {
      clearInterval(this.interval);
      this.props.refreshMessages();
      this.interval = setInterval(
        () => this.props.fetchMessages(this.props.match.params.channelID),

        2500
      );
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    if (this.props.loading) return <Loading />;

    const { channelID } = this.props.match.params;
    console.log(channelID);

    const channel = this.props.channels.find(
      (channel) => channel.id === +channelID
    );

    const channelName = `${channel.name}`;
    const MessageList = this.props.messages
      .slice()
      .reverse()
      .map((message) => <Message messages={message} user={this.props.user} />);

    return (
      <div className="container">
        {this.props.loading ? (
          <Loading />
        ) : (
          <center>
            <div className="channel">
              <h3>{channelName}</h3> <h6> Owner: {channel.owner}</h6>
              <div>
                <img
                  src={channel.image_url}
                  className="mb-1"
                  alt={channelName}
                  length="30%"
                  width="20%"
                />
              </div>
              <div style={{ height: "100vh", overflowY: "scroll" }}>
                <section className="">
                  {MessageList}
                  <MessageForm channelID={channel.id} />
                </section>
              </div>
            </div>
          </center>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ channels, messages, user }) => {
  return {
    channels,
    messages,
    user,
    loading: !channels.length || !messages.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (channelID) => dispatch(fetchMessages(channelID)),
    refreshMessages: () => dispatch(refreshMessages()),
    clearMessages: () => dispatch({ type: CLEAR_MESSAGES }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);

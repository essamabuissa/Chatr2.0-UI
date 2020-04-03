import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
// Components
import Loading from "./Loading";
import MessageForm from "./MessageForm";
import { fetchMessages, refreshMessages } from "../redux/actions";
import { CLEAR_MESSAGES } from "../redux/actions/actionTypes";

class ChannelDetail extends Component {
  interval = setInterval(
    () => this.props.fetchMessages(this.props.match.params.channelID),
    2500
  );

  // componentDidMount() {
  //   this.interval = setInterval(
  //     () => this.props.fetchMessages(this.props.match.params.channelID),
  //     2500
  //   );
  // }

  componentDidUpdate = previousProps => {
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
  // setLiveMessagesInterval() {
  //   this.interval = setInterval(() => {
  //     const messages = this.props.messages;
  //     let timestamp = "";
  //     if (messages.length) timestamp = messages[0].timestamp;
  //     this.props.fetchMessages(this.props.match.params.channelID, timestamp);
  //   }, 3500);
  // }
  // componentDidMount() {
  //   this.setLiveMessagesInterval();
  // }
  // componentDidUpdate(oldProps) {
  //   if (this.props.match.params.channelID !== oldProps.match.params.channelID) {
  //     this.props.clearMessages();
  //     clearInterval(this.interval);
  //     this.setLiveMessagesInterval();
  //   }
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
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
        <a className="comment-img" href="#non">
          <img
            src={
              "https://secure.gravatar.com/avatar/698ce814c8771e54b4821a23e086536a?s=100&r=g&d=mm"
            }
            alt=""
            width="50"
            height="50"
          />
        </a>
        {message.username === this.props.user.username ? (
          <div className="msj macro">
            <div className="avatar">
              <img
                className="img-circle"
                style={{ width: "100%" }}
                src="https://secure.gravatar.com/avatar/698ce814c8771e54b4821a23e086536a?s=100&r=g&d=mm"
              />
            </div>
            <div className="text text-l">
              <p>{message.username}</p>
              <p>{message.message}'</p>
              <p>
                <small>
                  Sent at {moment(message.timestamp).format(" h:mm:ss a")}
                </small>
              </p>
            </div>
          </div>
        ) : (
          <div className="msj-rta macro">
            <div className="avatar">
              <img
                className="img-circle"
                style={{ width: "100%" }}
                src="https://secure.gravatar.com/avatar/698ce814c8771e54b4821a23e086536a?s=100&r=g&d=mm"
              />
              <img
                className="img-circle"
                style={{ width: "100%" }}
                src={message.img}
              />
            </div>
            <div className="text text-r">
              <p>{message.username}</p>

              <p>{message.message}'</p>
              <p>
                <small>
                  Sent at {moment(message.timestamp).format(" h:mm:ss a")}
                </small>
              </p>
            </div>
          </div>
        )}
      </article>
    ));
    // console.log(this.props.messages);

    return (
      <div className="container text-center my-auto z-1">
        {this.props.loading ? (
          <Loading />
        ) : (
          <center>
            <div className="channel">
              <div>
                <h3>{channelName}</h3> <h6>owner: {channel.owner}</h6>
                <img src={channel.image_url} className="" alt={channelName} />
              </div>
              <MessageForm channelID={channel.id} />
              <section className="comments">{MessageList}</section>
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
    loading: !channels.length || !messages.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID => dispatch(fetchMessages(channelID)),
    refreshMessages: () => dispatch(refreshMessages()),
    clearMessages: () => dispatch({ type: CLEAR_MESSAGES })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);

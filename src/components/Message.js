import React from "react";
import moment from "moment";
const Message = (props) => {
  const message = props.messages;

  return (
    <div>
      {message.username === props.user.username ? (
        <div className=" received_withd_msg mr-5 black">
          <div className="incoming_msg_img ">
            <div className="bold mr-5">{message.username}</div>
            <img
              className="mb-1"
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />
          </div>
          <p>{message.message}</p>
          <span className="time_date">
            {" "}
            {moment(message.timestamp).format("dddd MMMM  YYYY, h:mm:ss a")}
          </span>{" "}
        </div>
      ) : (
        <div className="outgoing_msg black">
          <div className="sent_msg">
            <div className="incoming_msg_img">
              <div className="bold">{message.username}</div>
              <img
                className="mb-1"
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"
              />
            </div>
            <p>{message.message}</p>
            <span className="time_date">
              {" "}
              {moment(message.timestamp).format("dddd MMMM  YYYY, h:mm:ss a")}
            </span>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;

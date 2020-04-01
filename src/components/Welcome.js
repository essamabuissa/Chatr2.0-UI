import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Welcome = ({ user }) => (
  <div>
    <header className="masthead d-flex">
      {!user ? (
        <center>
          <div className="overlay z-0" />
          <h1 className="text-center"> Welcome to our Chatter</h1>
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
        </center>
      ) : (
        <div className="container text-center my-auto z-1">
          {/*
           * I don't think this form should be here at all.
           * This whole page is only supposed to show if the user isn't logged in.
           * If the user is logged in, they should be redirected
           */}
          <center>
            <h1 className="mb-1">WELCOME TO CHATR</h1>
            <h3 className="mb-5">
              <em>You're gonna need to login to see the messages</em>
            </h3>
          </center>
          <form>
            <textarea
              type="email"
              className="form-control mt-5"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </form>
          <center>
            {" "}
            <button type="submit" className="btn btn-primary btn-lg mt-3">
              {" "}
              Send{" "}
            </button>
          </center>
        </div>
      )}
    </header>
    <div className="form-group container"></div>
  </div>
);

const mapStateToProps = ({ user }) => ({
  user
});
export default connect(mapStateToProps)(Welcome);

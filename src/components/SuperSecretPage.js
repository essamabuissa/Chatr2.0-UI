import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

/**
 * This component was supposed to be used just to test your login
 * You should either change it or redirect the user somewhere more useful
 */
const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/login" />;

  return (
    <div>
      <h1>this page has all the secrets</h1>
      <p>now that you're logged in you can see this page</p>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(SuperSecretPage);

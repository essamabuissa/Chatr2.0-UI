import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import CreateChannel from "./components/CreateChannel";
import ChannelDetail from "./components/ChannelDetail";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          {/* See if you can go back to having channel name in the URL - it's better UX in the frontend */}
          <Route path="/channels/:channelID" component={ChannelDetail} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/createChannel" component={CreateChannel} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;

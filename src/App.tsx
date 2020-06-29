import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth";
import Theater from "./components/Theater";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import reducers from "./reducers";

const store = createStore(reducers, {});

const PrivateRouteComponent = ({
  isUserLoggedIn,
  component: Component,
  exact,
  path,
  ...rest
}: {
  isUserLoggedIn: boolean;
  component: any;
  exact: boolean;
  path: string;
}) => {
  console.log("isUserLoggedIn", isUserLoggedIn);

  return <Route exact={exact} path={path} component={Component} />;
  // return <Component {...rest} />;
  // return isAuthenticated ? (

  //   <Component {...rest} />
  // ) : (
  //   <Redirect noThrow to="/landing" />
  // );
};

const mapStateToProps = ({ isUserLoggedIn }: { isUserLoggedIn: boolean }) => ({
  isUserLoggedIn,
});
const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);

const App = () => {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
      <Router>
        <Switch>
          <Route exact={true} path="/" component={Auth} />
          <PrivateRoute exact={true} path="/theater" component={Theater} />
        </Switch>
      </Router>
      {/* </AuthProvider> */}
    </Provider>
  );
};

export default App;

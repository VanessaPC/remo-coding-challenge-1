import React, { useEffect } from "react";
import { connect } from "react-redux";
import Firebase from "../services/firebase";
import { useHistory } from "react-router-dom";
import { sendGetRequest, sendPostRequest } from "../apis";
import { logInUser, setUserDetails } from "../reducers/user/actions";

interface AuthProps {
  onLogInUser: () => void;
  onSetUserDetails: (user: any) => void;
}
const Auth: React.FC<AuthProps> = ({ onLogInUser, onSetUserDetails }) => {
  const history = useHistory();

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("USERRRRRR", user);
        onLogInUser();
        onSetUserDetails(user);
        // TODO: Store user details
        history.push("/theater");
      }
    });

    // Sample API requests
    sendGetRequest(`sample-get-request?param=1`).then((response) =>
      console.log(response)
    );
    sendPostRequest(`sample-post-request`, { postParam: 1 }).then((response) =>
      console.log(response)
    );
  }, []);

  const redirect = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(provider);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1> Remo Coding Challenge Join Room </h1>
      <button onClick={redirect}> Login With Google </button>
    </div>
  );
};

const mapDispatchToProps = {
  onLogInUser: logInUser,
  onSetUserDetails: setUserDetails,
};

export default connect(null, mapDispatchToProps)(Auth);

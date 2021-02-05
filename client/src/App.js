import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import Profile from "./components/profile/index";
import TableCard from "./components/tablecard/index";
// delete
import Bearone from "./components/bearone/index";
import Beartwo from "./components/beartwo/index";
// end
import { ToastProvider } from 'react-toast-notifications';
import "./style.css";

// const MyCustomToast = ({ appearance, children }) => (
//   <div style={{ marginTop: '50px' }}>
//     {children}
//   </div>
// );

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <ToastProvider>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/tablecard" component={TableCard} />
                <Route path="/bearone" component={Bearone} />
                <Route path="/beartwo" component={Beartwo} />
              </Switch>
            </div>
          </ToastProvider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  removeAuthData,
  setTokens
} from "../services/localStorage.service";
import Loader from "../components/ui/loader";
import { useHistory } from "react-router-dom";
import { randomInt } from "../utils/randomInt";
import { generateAuthError } from "../utils/generaiteAuthError";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});
const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setuser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  async function getUserData() {
    try {
      const { content } = await userService.getUser();
      setuser(content);
    } catch (error) {
      errorCather(error);
    } finally {
      setLoading(false);
    }
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post("accounts:signUp", {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });
    } catch (error) {
      errorCather(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        generateAuthError(message);
      }
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCather(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        generateAuthError(message);
      }
    }
  }

  async function userUpdate(data) {
    try {
      const { content } = await userService.updateUser(data);
      setuser(content);
    } catch (error) {
      errorCather(error);
    }
  }

  function logOut() {
    removeAuthData();
    setuser(null);
    history.push("/");
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setuser(content);
    } catch (error) {
      errorCather(error);
    }
  }

  function errorCather(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (localStorageService.getAccesToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  });

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, currentUser, logOut, userUpdate }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;

import React, { useEffect } from "react";
import FacebookIcon from "../assets/FacebookIcon";
import GithubIcon from "../assets/GithubIcon";
import GoogleIcon from "../assets/GoogleIcon";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../data/user-slice";
import getKeys from "../data/verifier";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {
  const query = useQuery();
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem("code"));
  const codes = data ? data : getKeys();
  console.log(codes);
  useEffect(() => {
    const code = query.get("code");

    if (code) {
      dispatch(
        loginUser({
          authCode: code,
          codeVerifier: codes.code_verifier,
        })
      );
      localStorage.clear();
    }
  }, []);

  const saveCodes = (data) => {
    console.log(data);
    localStorage.clear();
    localStorage.setItem("code", JSON.stringify(data));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="shadow-md rounded-lg w-[500px] flex flex-col bg-white gap-2 font-bold p-2">
        <h4 className="text-2xl py-2">Welcome</h4>
        <a
          className="py-2 w-full shadom-md decoration-none text-white text-center text-ms font-extrabold rounded-md bg-brandyellow"
          href={`https://cmd-auth.herokuapp.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_challenge=${codes.code_challenge}&code_challenge_method=S256&redirect_uri=https://cmd-app.netlify.app/login`}
          onClick={(e) => {
            saveCodes(codes);
          }}
        >
          Sign in
        </a>
        <a
          className="py-2 w-full shadom-md text-center decoration-none text-ms text-white font-bold rounded-md bg-brandblack"
          href="https://cmd-auth.herokuapp.com/signup"
        >
          Sign up
        </a>
        <div className="flex gap-[3px] items-center justify-center">
          <div className="flex-1 h-[2px] bg-gray-400"></div>
          <p className="text-md text-gray-400">Or</p>
          <div className="flex-1 h-[2px] bg-gray-500"></div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <GoogleIcon />
          <FacebookIcon />
          <GithubIcon />
        </div>
      </div>
      {false && (
        <div
          className="z-[100] absolute top-0 left-0 w-full h-screen flex items-center justify-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <div className="loading"></div>
        </div>
      )}
    </div>
  );
};

export default Login;

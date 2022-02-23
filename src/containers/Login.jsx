import React from "react";
import FacebookIcon from "../assets/FacebookIcon";
import GithubIcon from "../assets/GithubIcon";
import GoogleIcon from '../assets/GoogleIcon'

const Login = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="shadow-md rounded-lg w-[500px] flex flex-col bg-white gap-2 font-bold p-2">
          <h4 className="text-2xl py-2">Welcome</h4>
        <a
          className="py-2 w-full shadom-md decoration-none text-white text-center text-ms font-extrabold rounded-md bg-brandyellow"
          href="https://cmd-auth.herokuapp.com/oauth2/authorize?response_type=code&client_id=web-client&scope=openid&redirect_uri=https:"
          
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
    </div>
  );
};

export default Login;

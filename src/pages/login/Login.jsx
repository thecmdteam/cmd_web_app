import React, { useEffect, useLayoutEffect } from "react";
import FacebookIcon from '../../assets/FacebookIcon';
import GithubIcon from "../../assets/GithubIcon";
import GoogleIcon from "../../assets/GoogleIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from '../../store/authentication/authentication.actions'
import GoogleLogin from "react-google-login";
import { LocalStorage } from "../../services";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {
  const query = useQuery();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = JSON.parse(LocalStorage.get("code"));
  const codes = data 
  const githubKeys = null
  console.log(codes);

  // useEffect(() => {
  //   if (state.data) {
  //     navigate("/", { replace: true });
  //   }
  // }, [state.data]);

  // useEffect(() => {
  //   const code = query.get("code");

  //   if (code) {
  //     dispatch(
  //       loginUser({
  //         authCode: code,
  //         codeVerifier: codes.code_verifier,
  //       })
  //     );
  //     localStorage.clear();
  //   }
  // }, []);

  const saveCodes = (data) => {
    console.log(data);
    LocalStorage.clear();
    LocalStorage.set("code", JSON.stringify(data));
  };

  const googleSuccessResponse = (response) => {
    console.log(response);
  };

  const googleFailureResponse = (error) => {
    console.log(error);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="shadow-md rounded-lg w-[500px] flex flex-col bg-white gap-2 font-bold p-2">
        <h4 className="text-2xl py-2">Welcome</h4>
        <a
          className="py-2 w-full shadom-md decoration-none text-white text-center text-ms font-extrabold rounded-md bg-brandyellow"
          href={`https://cmd-auth.herokuapp.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_challenge=$codes.code_challenge&code_challenge_method=S256&redirect_uri=https://cmd-app.netlify.app/login`}
          onClick={(e) => {
            
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
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                type="button"
                className="bg-mainColor flex justify-center items-center cursor-pointer outline-none"
              >
                <GoogleIcon />
              </button>
            )}
            onSuccess={googleSuccessResponse}
            onFailure={googleFailureResponse}
            cookiePolicy="single_host_origin"
          />
          <FacebookIcon />
          <a
            className="decoration-none"
            href={`https://cmd-github-service.herokuapp.com/user/get-auth-code/$githubKeys.code_challenge`}
            onClick={(e) => {
              LocalStorage.clear();
              LocalStorage.set("github-code", githubKeys.code_challenge)
            }}
          >
            <GithubIcon />
          </a>
        </div>
      </div>
      {state.loading && (
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

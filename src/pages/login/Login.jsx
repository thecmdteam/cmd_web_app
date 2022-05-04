import React, { useEffect, useLayoutEffect } from "react";
import FacebookIcon from '../../assets/FacebookIcon';
import GithubIcon from "../../assets/GithubIcon";
import GoogleIcon from "../../assets/GoogleIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from '../../store/authentication/authentication.actions'
import GoogleLogin from "react-google-login";
import { LocalStorage } from "../../services";
import { useGetPkceChallengeQuery } from "../../store/authentication/authentication.pkce";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {
  const query = useQuery();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const codes = JSON.parse(LocalStorage.get("codes"));
  const { isLoading, isSuccess, isError, data, error } = useGetPkceChallengeQuery()
  console.log(state)
  
  useEffect(() => {
    console.log(codes, state)
    if (state.data) {
      navigate("/", { replace: true });
    }
  }, [state.data]);
  
  useEffect(() => {
    const code = query.get("code");
    if (code) {
      dispatch(
        loginUser({
          authCode: code,
          codeVerifier: codes.code_verifier,
        })
      );
    }
  }, []);

  const saveCodes = () => {
    LocalStorage.clear();
    LocalStorage.set("codes", JSON.stringify(data));
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
          href={data ? `https://cmd-auth.herokuapp.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_challenge=${data ? data.code_challenge : ""}&code_challenge_method=S256&redirect_uri=https://cmd-app.netlify.app/login`: "#"}
          onClick={(e) => saveCodes()}
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
            href={data ? `https://cmd-github-service.herokuapp.com/user/get-auth-code/${data.code_challenge}`: "#"}
            onClick={(e) => saveCodes()}
          >
            <GithubIcon />
          </a>
        </div>
      </div>
      {(state.loading || isLoading) && (
        <div
          className="z-[100] absolute top-0 left-0 w-full h-screen flex items-center justify-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <div className="loading"></div>
        </div>
      )}
      {isError && (
        <div
        className="z-[100] absolute top-0 left-0 w-full h-screen flex items-center justify-center"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <div className="shadow-md rounded-lg w-[500px] flex flex-col bg-white gap-2 font-bold p-2">
          <p className="text-md py-2">
            {error.code} - {error.message}
          </p>
        <a
          className="py-2 w-full shadom-md text-center decoration-none text-ms text-white font-bold rounded-md bg-brandblack"
          href="https://cmd-auth.herokuapp.com/signup"
        >
          Refresh
        </a>
        </div>
        
      </div>
      )}
    </div>
  );
};

export default Login;

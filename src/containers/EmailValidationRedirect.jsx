import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getGithubAuthToken } from "../data/user-slice";
import getKeys from "../data/verifier";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const EmailValidationRedirect = () => {
  const { type } = useParams();
  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);
  useEffect(() => {
    if (type == "github") {
      const githubCode = localStorage.getItem("github-code");
      const code = query.get("code");
      console.log("State", code, githubCode, query.get("state"))
      if (githubCode != query.get("state")) {
        console.log("State", code, githubCode, query.get("state"))
        //navigate("/error");
      } else {
        console.log("first")
        dispatch(getGithubAuthToken(code));
      }
    } else if (type == "cmd") {
      const codes = getKeys();
      saveCodes(codes);
      setTimeout(() => {
        window.location.href = `https://cmd-auth.herokuapp.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_challenge=${codes.code_challenge}&code_challenge_method=S256&redirect_uri=https://cmd-app.netlify.app/login`;
      }, 500);
    }
  }, []);

  useLayoutEffect(() => {
    if(state.data) navigate('/')
  }, [state])

  const saveCodes = (data) => {
    localStorage.clear();
    localStorage.setItem("code", JSON.stringify(data));
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="loading"></div>
    </div>
  );
};

export default EmailValidationRedirect;

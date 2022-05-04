import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalStorage } from "../../services";
import { getGithubAuthToken } from "../../store/authentication/authentication.actions";
import { useGetPkceChallengeQuery } from "../../store/authentication/authentication.pkce";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const EmailValidationRedirect = () => {
  const { type } = useParams();
  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, data } = useGetPkceChallengeQuery();

  useEffect(() => {
    if (type == "github") {
      const codes = JSON.parse(LocalStorage.get("codes"));
      const code = query.get("code");
      if (codes.code_challenge != query.get("state")) {
        navigate("/error");
      } else {
        dispatch(getGithubAuthToken(code));
      }
    } else if (type == "cmd") {
      saveCodes(data)
      setTimeout(() => {
        window.location.href = `https://cmd-auth.herokuapp.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_challenge=${data.code_challenge}&code_challenge_method=S256&redirect_uri=https://cmd-app.netlify.app/login`;
      }, 500);
    }
  }, []);

  useLayoutEffect(() => {
    if(state.data) navigate('/')
  }, [state])

  const saveCodes = (data) => {
    LocalStorage.clear();
    LocalStorage.set("code", JSON.stringify(data));
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="loading"></div>
    </div>
  );
};

export default EmailValidationRedirect;

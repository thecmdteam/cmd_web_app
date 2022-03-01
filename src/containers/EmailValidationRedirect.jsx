import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getKeys from "../data/verifier";

const EmailValidationRedirect = () => {
  useEffect(() => {
      const codes = getKeys();
      saveCodes(codes);
      setTimeout(() => {
        window.location.href = `https://cmd-auth.herokuapp.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_challenge=${codes.code_challenge}&code_challenge_method=S256&redirect_uri=https://cmd-app.netlify.app/login`;
      }, 3000)
  }, []);

  const saveCodes = (data) => {
    localStorage.clear();
    localStorage.setItem("code", JSON.stringify(data));
  };

  return <div className="flex items-center justify-center h-screen w-full">
      <div className="loading"></div>
  </div>;
};

export default EmailValidationRedirect;

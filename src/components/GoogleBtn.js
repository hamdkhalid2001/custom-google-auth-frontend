import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { inject, observer } from 'mobx-react';

function GoogleBtn({store}) {
  const navigate = useNavigate();
  
  const { status, error, mutate } = useMutation({
    mutationFn: async(token) => {
      return await axios.post(`${process.env.REACT_APP_API_URL}/users/AuthenticateWithGoogle?token=${token}`)
    },
    onError: (err) => {
        console.log("Error: ",err)
    },
    onSuccess: (data) => {
      navigate("/dashboard");
      //Store user data in store
      const newData = data.data.data
      store.currentUserData = {role: data.data.role, data: newData}
      store.jwtToken = data.data.jwtToken.token
    },
  });

  return (
    <div className="w-[210px] mt-4">
        <GoogleLogin    
        onSuccess={(credentialResponse) => {
        //   console.log("Response from google api",credentialResponse);
          mutate(credentialResponse.credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        />
    </div>
    
  );
}

export default inject('store')(observer(GoogleBtn));

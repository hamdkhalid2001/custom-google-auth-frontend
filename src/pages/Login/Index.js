import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import InputField from "../../components/InputField";
import GoogleBtn from "../../components/GoogleBtn";
import { inject, observer } from 'mobx-react';


function Index({ store }) {
    const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginFormData = [
    {
      type: "email",
      name: "email",
      id: "email",
      onChange: handleFormData,
      value: loginData.email,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      err: "It should be a valid email address!",
      label: "EMAIL",
      className: "input3",
    },
    {
      type: "password",
      name: "password",
      id: "password",
      onChange: handleFormData,
      value: loginData.password,
      pattern: "^(?=.*[a-z])(?=.*[0-9]).{8,16}$",
      err: "Password should be minimum 8 characters long and atleast one letter and one number!",
      label: "PASSWORD",
      className: "input4",
    },
  ];
  function handleFormData(event) {
    setLoginData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  const { status, error, mutate } = useMutation({
    mutationFn: (user) => {
      console.log("Data going: ",user)
      return axios.post(`${process.env.REACT_APP_API_URL}/users/Login`, user)
    },
    onError: (err) => {
      console.log("Error: ",err)
    },
    onSuccess: (data) => {
      navigate("/dashboard");
      const newData = data.data.user
      console.log(data)
      store.currentUserData = {role: data.data.role, data: newData}
      store.jwtToken = data.data.jwtToken.token

    },
  });
  function handleLogIn(event) {
    event.preventDefault();
    mutate({
      Email: loginData.email,
      Password: loginData.password,
    });
  }
  

  return (
    <div className="grid place-items-center">
      <h1 className="text-5xl">Log In To Your Account</h1>
      <section className="w-[90%] max-w-[375px] mt-7">
        <form onSubmit={handleLogIn} method="POST">
          {loginFormData.map((element, index) => {
            return <InputField data={element} key={index} />;
          })}
          {status === "error" && <div className="text-red-500 text-center text-lg mt-3 -mb-5">{error.message}</div> }

          <div className="w-full grid place-items-center">
            <button
              type="submit"
              className="bg-[#e3ae3e] font-normal mt-8 m-auto w-[210px] py-2"
            >
              Log In
            </button>
            <GoogleBtn />
          </div>
        </form>
      </section>
    </div>
  )
}

export default inject('store')(observer(Index));

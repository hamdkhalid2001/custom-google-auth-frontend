import React, { useState } from "react";
import InputField from "../../components/InputField";
import GoogleBtn from "../../components/GoogleBtn";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate , Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';

function Index({ store }) {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    userName: "",
    email: "",
    password: "",
    age: null,
  });

  const signUpFormData = [
    {
      type: "text",
      name: "userName",
      id: "userName",
      onChange: handleFormData,
      value: signUpData.userName,
      pattern: "[a-zA-Z0-9]+",
      err: "UserName shouldn't include spaces and characters!",
      label: "USERNAME",
      className: "input1",
    },
    {
      type: "number",
      name: "age",
      id: "age",
      onChange: handleFormData,
      // value: userData.age,
      pattern: "[a-zA-Z0-9]+",
      err: "Age can only contain numbers",
      label: "AGE",
      className: "input2",
    },
    {
      type: "email",
      name: "email",
      id: "email",
      onChange: handleFormData,
      value: signUpData.email,
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
      value: signUpData.password,
      pattern: "^(?=.*[a-z])(?=.*[0-9]).{8,16}$",
      err: "Password should be minimum 8 characters long and atleast one letter and one number!",
      label: "PASSWORD",
      className: "input4",
    },
  ];
  function handleFormData(event) {
    setSignUpData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  const { status, error, mutate } = useMutation({
    mutationFn: (user) => {
      console.log("Data going: ",user)
      return axios.post(`${process.env.REACT_APP_API_URL}/users/Signup`, user)
    },
    onError: (err) => {
      console.log("Error: ",err)
    },
    onSuccess: (data) => {
      navigate("/dashboard");
      const newData = data.data.user
      store.currentUserData = {role: data.data.role, data: newData}
      store.jwtToken = data.data.jwtToken.token
    },
  });

  function handleSignUp(event) {
    event.preventDefault();
    mutate({
      UserName: signUpData.userName,
      Email: signUpData.email,
      Password: signUpData.password,
      Age: Number(signUpData.age),
    });
  }

  return (
    <div className="grid place-items-center">
      <h1 className="text-5xl">Create New Account</h1>
      <section className="w-[90%] max-w-[375px] mt-7">
        <form onSubmit={handleSignUp} method="POST">
          {signUpFormData.map((element, index) => {
            return <InputField data={element} key={index} />;
          })}
          {status === "error" && <div className="text-red-500 text-center text-lg mt-3 -mb-5">{error.message}</div> }

          <div className="w-full grid place-items-center">
            <button
              type="submit"
              className="bg-[#e3ae3e] font-normal mt-8 m-auto w-[210px] py-2"
            >
              Sign Up
            </button>
            <GoogleBtn />
          </div>
        </form>
      </section>
      <Link to={"/login"}>
        <p className="underline font-normal mt-6">Already have an account?</p>
      </Link>
    </div>
  );
}
export default inject('store')(observer(Index));


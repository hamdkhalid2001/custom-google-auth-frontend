import React, { useState } from 'react'
import InputField from '../../components/InputField';
import GoogleBtn from '../../components/GoogleBtn';
function Index() {

    const[userData,setUserData] = useState({
        userName:"",
        email:"",
        password:""
    })
    
    const signUpFormData = [
        {
          type: "text",
          name: "userName",
          id: "userName",
          onChange: handleFormData,
          value: userData.userName,
          pattern:"[a-zA-Z0-9]+",
          err: "UserName shouldn't include spaces and characters!",
          label: "USERNAME",
          className: "input1"
        },
        {
          type: "email",
          name: "email",
          id: "email",
          onChange: handleFormData,
          value: userData.email,
          pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          err: "It should be a valid email address!",
          label: "EMAIL",
          className: "input2"
        },
        {
          type: "password",
          name: "password",
          id: "password",
          onChange: handleFormData,
          value: userData.password,
          pattern: "^(?=.*[a-z])(?=.*[0-9]).{8,16}$",
          err: "Password should be minimum 8 characters long and atleast one letter and one number!",
          label: "PASSWORD",
          className: "input3"

        },
      ];
    function handleFormData(event) {
        setUserData((prevUserData) => {
          return {
            ...prevUserData,
            [event.target.name]: event.target.value,
          };
        });
      }

    function handleSignUp(event){
      event.preventDefault();
    }
      
  return (
    <div className='grid place-items-center'>
        <h1 className='text-5xl'>Create New Account</h1>
        <section className='w-[90%] max-w-[375px] mt-7'>
          <form onSubmit={handleSignUp} method="POST">
            {signUpFormData.map((element, index) => {
                return <InputField data={element} key={index} />;
              })}
          <div className='w-full grid place-items-center'>
            <button type='submit' className='bg-[#e3ae3e] font-normal mt-8 m-auto w-[210px] py-2'>Sign Up</button>
            <GoogleBtn/>
          </div>
          </form>
        </section>
    </div>
  )
}

export default Index
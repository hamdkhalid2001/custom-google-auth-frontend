import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';

function GoogleBtn() {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });
      
    return (
    <button className='bg-blue-600 text-white font-normal mt-4 m-auto w-[210px] py-2' onClick={() => login()}>
        Sign in with Google
        <span><img src='/images/google-logo.svg' alt="" className='w-5 inline-flex ml-2'/></span>
    </button>
  )
}

export default GoogleBtn
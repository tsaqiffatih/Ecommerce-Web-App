import React, { useEffect, useState } from 'react';
import LocalRequest from '../utils/axios';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function GoogleLoginButton() {
  const navigate = useNavigate()

  async function loginWith(credential) {
    try {

      const { data } = await axios({
        method: 'post',
        url: 'http://localhost:3000/credentials/google-login',
        headers: {
          google_token: credential,
        }
      })
      console.log(data.token);
      localStorage.setItem('token',data.token)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  function handleCredentialResponse(response) {
    loginWith(response.credential)
  }


  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "327393961797-76i7f899lt4u2gbckuqsh3shnal3gp0a.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buatan saya"),
        {
          size: "large",
          type: "icon",
          shape: "circle",
          theme: "outline",
          text: "continue_with",
        }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  }, [])


  return (
    <div>
      <div id="buatan saya"></div>
    </div>
  );
}

export default GoogleLoginButton;

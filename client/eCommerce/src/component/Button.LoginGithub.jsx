import React, { useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function buttonGitHubLogin() {

  const navigate = useNavigate()

  const Login = () => {
    const handleLogin = () => {
      // Redirect ke endpoint OAuth pada sisi server
      window.location.href = "http://localhost:3000/credentials/auth/github";
    };

    const handleCallback = async (code) => {
      try {
        // Mendapatkan token akses dari GitHub
        const response = await fetch("http://localhost:3000/credentials/github-callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
          }),
        });

        const data = await response.json();
        const { token } = data;
        console.log("Token:", token);
        // Simpan token ke localStorage atau sessionStorage
        localStorage.setItem("token", token);
        // Redirect ke halaman home
        navigate('/')
      } catch (error) {
        console.log("Error:", error);
      }
    };

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        handleCallback(code);
      }
    }, []);

    return (
      <div>
        <h2>Login Page</h2>
        <button onClick={Login}
          href="#"
          className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
        >
          <img
            className="max-w-[25px] filter dark:invert"
            src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
            alt="Github"
          />
        </button>
      </div>
    );
  };
}
export default buttonGitHubLogin;

import GoogleLoginButton from "../component/Button.LoginGoogle";
import reacLogo from '../assets/react.svg'
import { DarkThemeToggle, useThemeMode } from "flowbite-react";
import axios from 'axios'
import LoginWithGithub from "../component/Button.LoginGithub";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LocalRequest from "../utils/axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";



function LoginPage() {

    let [input, setInput] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value,
        })
    };

    const navigate = useNavigate()

    const handleForm = async (e) => {

        e.preventDefault()
        try {
            const { data } = await axios({
                method: 'post',
                url: 'http://localhost:3000/credentials/login',
                data: input,
            });

            // console.log(data.user_token, '<<<<');
            localStorage.setItem('access_token', data.user_token)

            navigate("/")
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: error.response.data.message
            })
        }
    }

    return (
        <>
            <div className="grid gap-8">
                <div
                    id="back-div"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4 "
                >
                    <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">

                        {/* <DarkThemeToggle/> */}

                        <h1 className="pt-8 pb-6 font-bold text-5xl dark:text-gray-400 text-center cursor-default">
                            Sign In
                        </h1>

                        <form className="space-y-4" onSubmit={handleForm}>
                            <div>
                                <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 dark:text-gray-400 text-lg"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleInput}
                                />
                            </div>
                            <button
                                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                                type="submit"
                            >
                                SIGN IN
                            </button>
                        </form>

                        <div className="flex flex-col mt-4 items-center justify-center text-sm">
                            <h3>
                                <span className="cursor-default dark:text-gray-300">
                                    Doesn't have an account?
                                </span>
                                <Link
                                    to={'/register'}
                                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                                    href="#"
                                >
                                    <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Sign up
                                    </span>
                                </Link>
                            </h3>
                        </div>
                        {/* Third Party Authentication Options */}
                        <div className="flex flex-col mt-4 items-center justify-center text-sm">
                            <h3>
                                <span className="cursor-default dark:text-gray-300">
                                    or
                                </span>
                            </h3>
                        </div>
                        <div className="flex flex-col mt-4 items-center justify-center text-sm">
                            <h3>
                                <span className="cursor-default dark:text-gray-300">
                                    Login with:
                                </span>
                            </h3>
                        </div>
                        <div
                            id="third-party-auth"
                            className="flex items-center justify-center mt-5 flex-wrap"
                        >
                            {/*ini tombol login Google */}
                            <GoogleLoginButton />
                            {/* dibawah ini tombol login Linkedin */}
                            <button
                                href="#"
                                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                            >
                                <img
                                    className="max-w-[25px]"
                                    src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                                    alt="Linkedin"
                                />
                            </button>
                            {/* dibawah ini tombol login Github */}
                            <button
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
                        <LoginWithGithub />
                        <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
                            <p className="cursor-default">
                                By signing in, you agree to our
                                <a
                                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                                    href="#"
                                >
                                    <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Terms
                                    </span>
                                </a>
                                and
                                <a
                                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                                    href="#"
                                >
                                    <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Privacy Policy
                                    </span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default LoginPage;
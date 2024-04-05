import { useState } from "react";
import { loginThunk, setshowFailure } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginFailedModal from "../components/login/modals/LoginFailedModal";
import { AnimatePresence } from "framer-motion";
import LoginLoadingModal from "../components/login/modals/LoginLoadingModal";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {showFailure,showLoading} = useSelector((state) => {
        return state.user;
    });

    const handleFailedModal = () => {
        dispatch(setshowFailure(false));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInput = { email, password };
        await dispatch(loginThunk(userInput));
        const name = localStorage.getItem("name");
        if(name === null){
            setEmail('')
            setPassword('')
        }else{
            navigate("/home")
        }
    };

 
    
    

    return (
        <div className='bg-indigo-300 font-worksans flex flex-col items-center justify-center  w-screen h-screen '>
            <h1 className='text-3xl m-8 text-center font-bold tracking-wide z-10'>
                Expense Manager
            </h1>

            <form
                className='py-16 px-8 md:px-16 rounded bg-purple-100 mx-4 z-10 md:w-2/3 lg:w-1/2 shadow'
                onSubmit={handleSubmit}
            >
                <div>
                    <h1 className='text-center text-2xl mb-4 text-slate-600'>
                        Enter Details
                    </h1>
                </div>
                <div className='bg-white shadow rounded focus-within:shadow-xl px-10 py-5 space-y-8'>
                    <div className='flex flex-col space-y-4'>
                        <label className='text-slate-600 font-semibold text-lg'>
                            Email
                        </label>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            className='focus:outline-none border-b-2 focus:border-b-blue-300'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <label className='text-slate-600 font-semibold text-lg'>
                            Password
                        </label>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            className='focus:outline-none border-b-2  focus:border-b-blue-300'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <input
                            type='submit'
                            value='Login'
                            className='border-4 px-4 md:w-full mx-4 rounded-lg py-2 bg-blue-600 text-slate-200 hover:bg-blue-800 cursor-pointer '
                        />
                    </div>
                </div>
                <p className='px-4 text-sm mt-4'>
                    Don't Have an Account?{" "}
                    <a href='/signup' className='underline'>
                        Sign up
                    </a>
                </p>
            </form>

            <AnimatePresence>
                {showFailure && (
                    <LoginFailedModal handleClose={handleFailedModal} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {
                    showLoading&& <LoginLoadingModal />
                }
            </AnimatePresence>

        </div>
    );
}

export default LoginPage;

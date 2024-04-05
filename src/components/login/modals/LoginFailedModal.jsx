import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setshowFailure } from "../../../store/store";
import { BiErrorAlt } from "react-icons/bi";
import { motion } from "framer-motion";

function LoginFailedModal({ handleClose }) {
    const dispatch = useDispatch();
    useEffect(() => {
        
        setTimeout(() => {
            dispatch(setshowFailure(false));
        }, 3000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            initial={{ transform: "translate(-500px,0px)", opacity: 0 }}
            animate={{ transform: "translate(0px,0px)", opacity: 1 }}
            exit={{ transform: "translate(-500px,0px)", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className='absolute bottom-10 right-6   bg-red-500 flex flex-col gap-4 py-2 px-6 z-20 text-slate-100'
        >
            <button
                className='place-self-end bg-slate-100 px-2 text-slate-700 rounded-full'
                onClick={handleClose}
            >
                X
            </button>
            <div className='flex gap-2'>
                <BiErrorAlt className='text-2xl' />
                <p>Email/Password is incorrect!</p>
            </div>
        </motion.div>
    );
}

export default LoginFailedModal;

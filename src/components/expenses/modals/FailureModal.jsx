import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowFailed } from "../../../store/store";
import { motion } from "framer-motion";
import { BiErrorAlt } from "react-icons/bi";

function FailureModal({ msg }) {
    const dispatch = useDispatch();

    useEffect(() => {
        
        setTimeout(() => {
            dispatch(setShowFailed());
        }, 3000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = () => {
        dispatch(setShowFailed());
    };

    return (
        <motion.div
            initial={{ transform: "translate(0px,-200px)", opacity: 0 }}
            animate={{ transform: "translate(0px,0px)", opacity: 1 }}
            exit={{ transform: "translate(0px,-200px)", opacity: 0 }}
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
                <p>{msg}</p>
            </div>
        </motion.div>
    );
}

export default FailureModal;

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function LoginLoadingModal() {
    const container = useRef();

    useEffect(() => {
        
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return createPortal(
        <motion.div
            className='fixed inset-0 bg-gray-300 bg-opacity-80 z-10 flex items-center justify-center'
            ref={container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className=' px-10 py-10 bg-blue-50 '
                animate={{ rotate: -360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    repeat: Infinity,
                    delay: 0.5,
                }}
            >
                <motion.div
                    className=' p-4 rounded-sm bg-black text-white'
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        repeat: Infinity,
                        delay: 0.5,
                    }}
                >
                    Logging In...
                </motion.div>
            </motion.div>
        </motion.div>,
        document.getElementById("login-container")
    );
}

export default LoginLoadingModal;

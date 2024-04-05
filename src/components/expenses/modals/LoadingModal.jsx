import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function LoadingModal() {
    const modal = createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0  bg-gray-300 bg-opacity-80 z-10 flex items-center justify-center'
        >
            <motion.div
                className=' p-4 rounded-sm bg-black text-white'
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    repeat: Infinity,
                    delay:0.5
                }}
            >
                Loading...
            </motion.div>
        </motion.div>,
        document.getElementById("loading-container")
    );
    return modal;
}

export default LoadingModal;

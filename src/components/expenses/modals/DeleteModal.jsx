import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import {
    deleteExpense,
    fetchExpenses,
    getExpensesCount,
    setShowDelete,
} from "../../../store/store";
import { motion } from "framer-motion";

function DeleteModal({ id }) {
    const dispatch = useDispatch();

    useEffect(() => {
        
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleCancel = () => dispatch(setShowDelete());

    const handleConfirm = async () => {
        await dispatch(deleteExpense(id));
        dispatch(getExpensesCount());
        dispatch(fetchExpenses(1));
        dispatch(setShowDelete());
    };

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-gray-300 bg-opacity-80 z-10 flex items-center justify-center'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className='flex bg-white flex-col gap-3 px-10 py-5'
            >
                <p>Are you sure you want to delete this Expense?</p>
                <div className='flex justify-end mx-3 gap-4'>
                    <button
                        className='px-2 py-1 bg-red-500 text-slate-50 rounded hover:bg-red-600'
                        onClick={handleCancel}
                    >
                        No
                    </button>
                    <button
                        className='px-2 py-1 bg-green-500 text-slate-50 rounded hover:bg-green-600'
                        onClick={handleConfirm}
                    >
                        Yes, Delete!
                    </button>
                </div>
            </motion.div>
        </motion.div>,
        document.getElementById("delete-container")
    );
}

export default DeleteModal;

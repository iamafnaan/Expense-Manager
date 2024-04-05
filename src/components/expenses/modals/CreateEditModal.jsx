import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import {
    addExpense,
    editExpense,
    fetchExpenses,
    fetchOneExpense,
} from "../../../store/store";
import { motion } from "framer-motion";
import DropDown from "../../DropDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateEditModal({ handleClose, edit, id }) {
    const dispatch = useDispatch();
    const [expenseDetails, setExpenseDetails] = useState({
        id,
        name: "",
        description: "",
        category: "",
        dateOfExpense: 0,
        amount: 0,
    });

    useEffect(() => {
       
        if (edit) {
            const fetchExpense = async () => {
                const response = await dispatch(
                    fetchOneExpense(expenseDetails.id)
                );
                const {
                    id,
                    name,
                    description,
                    category,
                    dateOfExpense,
                    amount,
                } = response.payload;
                setExpenseDetails((prev) => {
                    return {
                        ...prev,
                        id,
                        name,
                        description,
                        category,
                        dateOfExpense,
                        amount,
                    };
                });
            };
            fetchExpense();
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const categories = [
        "Health",
        "Electronics",
        "Travel",
        "Education",
        "Books",
        "Others",
    ];
     
    useEffect(() => {
        
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
       

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            await dispatch(editExpense(expenseDetails));
            dispatch(fetchExpenses(1));
        } else {
            await dispatch(addExpense(expenseDetails));
            dispatch(fetchExpenses(1));
        }
        handleClose();
    };

    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-gray-300 bg-opacity-80 z-10 flex items-center justify-center'
        >
            <motion.div
                initial={{ transform: "translate(0px,-2000px)", opacity: 0 }}
                animate={{ transform: "translate(0px,0px)", opacity: 1 }}
                exit={{ transform: "translate(0px,-2000px)", opacity: 0 }}
                className='fixed w-4/5 md:w-2/5 bg-white text-slate-600'
                onSubmit={handleSubmit}
            >
                <div className='py-8 px-10 space-y-4'>
                    <div className='flex flex-col gap-3'>
                        <label>Name</label>
                        <input
                            onChange={(e) =>
                                setExpenseDetails((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            value={expenseDetails.name}
                            maxLength={140}
                            type='text'
                            className='font-semibold border-b-2 focus:outline-none focus:border-b-blue-200 focus:bg-slate-50 p-1'
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Description</label>
                        <input
                            onChange={(e) =>
                                setExpenseDetails((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            value={expenseDetails.description}
                            type='text'
                            className='font-semibold border-b-2 focus:outline-none focus:border-b-blue-200 focus:bg-slate-50 p-1'
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Category</label>
                        <DropDown
                            options={categories}
                            value={expenseDetails.category}
                            onChange={(option) => {
                                setExpenseDetails((prev) => ({
                                    ...prev,
                                    category: option,
                                }));
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Date of Expense</label>
                        <DatePicker
                            selected={expenseDetails.dateOfExpense || ""}
                            onChange={(date) =>
                                setExpenseDetails((prev) => ({
                                    ...prev,
                                    dateOfExpense: date.getTime(),
                                }))
                            }
                            maxDate={new Date()}
                            className='border-b-2 text-center  focus:outline-none focus:border-b-blue-400'
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Amount</label>
                        <input
                            onChange={(e) => {
                                setExpenseDetails((prev) => ({
                                    ...prev,
                                    amount:
                                        e.target.value < 0 ? 0 : e.target.value,
                                }));
                            }}
                            value={expenseDetails.amount || ""}
                            type='number'
                            min='0'
                            className='font-semibold border-b-2 focus:outline-none focus:border-b-blue-200 focus:bg-slate-50 p-1'
                        />
                    </div>
                </div>
                <div className='flex justify-around my-8'>
                    <button
                        onClick={handleClose}
                        className='border-2 px-4 py-1 rounded bg-gray-500 text-[#e4e4e4]'
                    >
                        Close
                    </button>
                    <button
                        className='border-2 px-4 py-1 rounded bg-green-500 text-[#e4e4e4] hover:bg-green-700'
                        onClick={handleSubmit}
                    >
                        Create Expense
                    </button>
                </div>
            </motion.div>
        </motion.div>,
        document.getElementById("create-modal-container")
    );
}

export default CreateEditModal;

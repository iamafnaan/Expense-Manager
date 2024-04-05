import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchDate, setSearchTerm } from "../store/store";
import Table from "../components/expenses/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreateEditModal from "../components/expenses/modals/CreateEditModal";
import { AnimatePresence } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import SuccessModal from "../components/expenses/modals/SuccesModal";
import FailureModal from "../components/expenses/modals/FailureModal";

function ViewExpensesPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { searchTerm, searchDate, success, failure } = useSelector(
        (state) => {
            return state.expenses;
        }
    );

    useEffect(() => {
        const name = localStorage.getItem("name");
        name === null && navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [showExpenseCEModal, setShowExpenseCEModal] = useState({
        show: false,
        edit: false,
        id: -1,
    });
    

    const handleCreateEditModalClose = () => {
        setShowExpenseCEModal((prev) => ({ edit: false, id: -1, show: false }));
    };

    const handleCreateExpense = () => {
        setShowExpenseCEModal((prev) => ({ ...prev, show: true }));
    };

    const handleExpenseEdit = (id) => {
        setShowExpenseCEModal((prev) => ({ edit: true, id, show: true }));
    };

    const handleLogout = () => {
        localStorage.removeItem("name");
        navigate("/");
    };

    const createOrEditExpense = (
        <AnimatePresence>
            {showExpenseCEModal.show && (
                <CreateEditModal
                    handleClose={handleCreateEditModalClose}
                    edit={showExpenseCEModal.edit}
                    id={showExpenseCEModal.id}
                />
            )}
        </AnimatePresence>
    );

    return (
        <>
            <div className='flex flex-col justify-center font-worksans'>
                <div className='relative flex justify-end gap-3 items-center mx-4'>
                    <FiLogOut
                        onClick={handleLogout}
                        className='  cursor-pointer hover:text-blue-600 my-1 text-2xl'
                    ></FiLogOut>
                </div>
                <h1 className='text-3xl m-8 text-center font-bold tracking-wide z-10'>
                    Expense Manager
                </h1>
                <div className='flex flex-col md:flex-row text-slate-600 justify-end items-center gap-10 mx-10'>
                    <DatePicker
                        selected={searchDate}
                        onChange={(date) => {
                            date === null
                                ? dispatch(setSearchDate(0))
                                : dispatch(setSearchDate(date.getTime()));
                        }}
                        maxDate={new Date()}
                        placeholderText={new Date().toLocaleDateString("es")}
                        className='border-2 text-center  focus:outline-none focus:border-b-green-400 rounded-md'
                    />
                    <input
                        type='text'
                        placeholder='Search by name'
                        value={searchTerm}
                        onChange={(e) =>
                            dispatch(setSearchTerm(e.target.value))
                        }
                        className='border-2 focus:outline-none text-justify md:text-left focus:border-b-green-400 rounded-md py-0'
                    />

                    <button
                        onClick={handleCreateExpense}
                        className='bg-green-500 text-[#e4e4e4] px-2 py-1 w-full md:w-auto cursor-pointer hover:bg-green-700 rounded-md'
                    >
                        + Create new Expense
                    </button>
                </div>

                <Table onEdit={handleExpenseEdit} />
                {createOrEditExpense}
                <AnimatePresence>
                    {success.showSuccessBox && (
                        <SuccessModal msg={success.message} />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {failure.showErrorBox && (
                        <FailureModal msg={failure.message} />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default ViewExpensesPage;

import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchExpenses,
    getExpensesCount,
    setShowDelete,
} from "../../store/store";
import { useEffect } from "react";
import LoadingModal from "./modals/LoadingModal";
import { dateDiff } from "../../utils/dateDiff";
import { AnimatePresence } from "framer-motion";
import DeleteModal from "./modals/DeleteModal";
import ReactPaginate from "react-paginate";
import useExpenseFilter from "../../hooks/useExpenseFilter";
var ID = -1;

function Table({ onEdit }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExpensesCount());
        dispatch(fetchExpenses(1));
    }, [dispatch]);

    const { showDelete, totalCount, showLoading } = useSelector((state) => {
        return state.expenses;
    });

    const handleExpenseDelete = (id) => {
        dispatch(setShowDelete());
        ID = id;
    };

    const handlePageClick = (data) => {
        const page = data.selected + 1;
        dispatch(fetchExpenses(page));
    };


    const data = useExpenseFilter();

    const renderedRows = data
        .filter((item, index) => index < 5)
        .map((item) => {
            
            const updatedTime = dateDiff(item.updatedAt);
            return (
                <tr
                    className='bg-red-100 border-b text-center'
                    key={item.id}
                >
                    <th className='px-6 py-4'>{item.name}</th>
                    <td className='px-6 py-4'>{item.category}</td>
                    <td className='px-6 py-4'>
                        {new Date(item.dateOfExpense).toLocaleDateString("es")}
                    </td>
                    <td className='px-6 py-4 font-semibold'>
                        {item.amount + " ₹"}
                    </td>
                    <td className='px-6 py-4'>{updatedTime.toString()}</td>
                    <td className='px-6 py-4'>
                        {item.owner === localStorage.getItem("name")
                            ? "me"
                            : item.owner}
                    </td>
                    <td>
                        <div className='h-full w-full flex items-center gap-4 justify-center'>
                            <BiEdit
                                onClick={() => onEdit(item.id)}
                                className='cursor-pointer hover:text-yellow-500 text-xl'
                            />

                            <AiOutlineDelete
                                onClick={() => handleExpenseDelete(item.id)}
                                className='cursor-pointer hover:text-red-500 text-xl'
                            />
                        </div>
                    </td>
                </tr>
            );
        });

    return (
        <div className='container mx-auto font-worksans'>
            {showLoading && <LoadingModal />}
            <div className='relative overflow-x-auto mx-4 my-8 border-2 rounded-lg'>
                <table className='w-full text-sm text-left text-gray-500 -400 '>
                    <thead className='text-sm text-slate-100 uppercase bg-gray-500  '>
                        <tr className='text-center'>
                            <th className='px-6 py-3'>Name</th>
                            <th className='px-6 py-3'>Category</th>
                            <th className='px-6 py-3'>Date of Expense</th>
                            <th className='px-6 py-3'>Amount</th>
                            <th className='px-6 py-3'>Updated At</th>
                            <th className='px-6 py-3'>Created By</th>
                            <th className='px-6 py-3'></th>
                        </tr>
                    </thead>
                    <tbody className=''>{renderedRows}</tbody>
                </table>
            </div>
            <div className='flex justify-center md:justify-end  md:mx-10 mb-10 '>
                <ReactPaginate
                    pageCount={Math.ceil(totalCount / 5)}
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    breakClassName='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-600 bg-white border border-gray-300  hover:bg-gray-300 hover:text-gray-700 '
                    containerClassName='inline-flex -space-x-px text-sm'
                    nextClassName='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-600 bg-white border border-gray-300  hover:bg-gray-300 hover:text-gray-700 '
                    previousClassName='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-600 bg-white border border-gray-300  hover:bg-gray-300 hover:text-gray-700 '
                    pageClassName='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-600 bg-white border border-gray-300  hover:bg-gray-300 hover:text-gray-700 '
                    activeClassName='bg-blue-300'
                />
            </div>
            <AnimatePresence>
                {showDelete && <DeleteModal id={ID} />}
            </AnimatePresence>
        </div>
    );
}

export default Table;

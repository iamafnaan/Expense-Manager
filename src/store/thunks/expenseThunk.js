import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getExpensesCount = createAsyncThunk('/expense/getCount',async()=>{
    const response = await axios.get(`${process.env.REACT_APP_MOCK_EXPENSE_BASE_URL}`)
    return response.data;
})

const fetchExpenses = createAsyncThunk("/expense/fetch", async (page) => {
    
    const response = await axios.get(
        `${process.env.REACT_APP_MOCK_EXPENSE_BASE_URL}/?sortBy=updatedAt&order=desc&page=${page}&limit=5`
    );
    return response.data;
});

const fetchOneExpense = createAsyncThunk("/expense/fetchOne", async (id) => {
    const response = await axios.get(
        `${process.env.REACT_APP_MOCK_EXPENSE_BASE_URL}/${id}`
    );

    return response.data;
});

const addExpense = createAsyncThunk("/expense/add", async (data) => {
    const response = await axios.post(
        process.env.REACT_APP_MOCK_EXPENSE_BASE_URL,
        {
            ...data,
            updatedAt:new Date().getTime(),
            owner: localStorage.getItem("name"),
        }
    );
    return response.data;
});

const editExpense = createAsyncThunk("/expense/edit", async (data) => {
    const response = await axios.put(
        `${process.env.REACT_APP_MOCK_EXPENSE_BASE_URL}/${data.id}`,
        {
            ...data,
            updatedAt: new Date().getTime(),
        }
    );
    return response.data;
});

const deleteExpense = createAsyncThunk("/expense/delete", async (id) => {
    const response = await axios.delete(
        `${process.env.REACT_APP_MOCK_EXPENSE_BASE_URL}/${id}`
    );
    return response.data;
});

export {
    fetchExpenses,
    addExpense,
    editExpense,
    deleteExpense,
    fetchOneExpense,
    getExpensesCount
};

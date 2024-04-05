import { createSlice } from "@reduxjs/toolkit";
import {
    addExpense,
    deleteExpense,
    editExpense,
    fetchExpenses,
    fetchOneExpense,
    getExpensesCount,
} from "../store";

const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
        data: [],
        totalCount:0,
        searchTerm: "",
        searchDate: 0,
        showLoading: false,
        showDelete: false,
        success: {
            showSuccessBox: false,
            message: "",
        },
        failure: {
            showErrorBox: false,
            message: "",
        },
    },
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSearchDate(state, action) {
            state.searchDate = action.payload;
        },
        setShowDelete(state, action) {
            state.showDelete = !state.showDelete;
        },
        setShowSuccess(state,action){
            state.success.showSuccessBox = false;
            state.success.message = ''
        },
        setShowFailed(state,action){
            state.failure.showErrorBox = false;
            state.failure.message= ''
        }
    },
    extraReducers(builder) {
        builder.addCase(getExpensesCount.pending, (state, action) => {
        });
        builder.addCase(getExpensesCount.fulfilled, (state, action) => {
            state.showLoading = false;
            state.totalCount = action.payload.length;
        });
        builder.addCase(getExpensesCount.rejected, (state, action) => {
            state.showLoading = false;
            state.failure.showErrorBox = true;
            state.failure.message = "Failed to fetch Expenses count";
        });

        builder.addCase(fetchExpenses.pending, (state, action) => {
            state.showLoading = true;
        });
        builder.addCase(fetchExpenses.fulfilled, (state, action) => {
            state.showLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchExpenses.rejected, (state, action) => {
            state.showLoading = false;
            state.failure.showErrorBox = true;
            state.failure.message = "Failed to fetch Expenses";
        });

        builder.addCase(fetchOneExpense.pending, (state, action) => {
            state.showLoading = true;
        });
        builder.addCase(fetchOneExpense.fulfilled, (state, action) => {
            state.showLoading = false;
        });
        builder.addCase(fetchOneExpense.rejected, (state, action) => {
            state.showLoading = false;
            state.failure.showErrorBox = true;
            state.failure.message = "Could not fetch the Expense!";
        });

        builder.addCase(addExpense.pending, (state, action) => {
            state.showLoading = true;
        });
        builder.addCase(addExpense.fulfilled, (state, action) => {
            state.showLoading = false;
            state.data.push(action.payload);
            state.success.showSuccessBox=true;
            state.success.message="New Expense added!"
        });
        builder.addCase(addExpense.rejected, (state, action) => {
            state.showLoading = false;
            state.failure.showErrorBox = true;
            state.failure.message = "Could not fetch the Expense!";
        });

        builder.addCase(editExpense.pending, (state, action) => {
            state.showLoading = true;
        });
        builder.addCase(editExpense.fulfilled, (state, action) => {
            state.showLoading = false;
            state.data = state.data.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            state.success.showSuccessBox=true;
            state.success.message="Expense Modified Successfully!"
        });
        builder.addCase(editExpense.rejected, (state, action) => {
            state.showLoading = false;
            state.failure.showErrorBox = true;
            state.failure.message = "Could not update the Expense!";
        });

        builder.addCase(deleteExpense.pending, (state, action) => {
            state.showLoading = true;
        });
        builder.addCase(deleteExpense.fulfilled, (state, action) => {
            state.showLoading = false;
            state.data = state.data.filter((item) => {
                return item.id !== action.payload.id;
            });
            state.success.showSuccessBox=true;
            state.success.message="Expense Deleted Successfully!"
        });
        builder.addCase(deleteExpense.rejected, (state, action) => {
            state.showLoading = false;
            state.failure.showErrorBox = true;
            state.failure.message = "Could not Delete the Expense!";
        });
    },
});

export const expenseReducer = expensesSlice.reducer;

export const { setSearchTerm, setSearchDate, setShowDelete, setShowFailed, setShowSuccess } =
    expensesSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { expenseReducer } from "./slices/expensesSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        expenses:expenseReducer
    },
});

export { store };

export * from "./thunks/loginThunk";
export * from "./thunks/expenseThunk";

export * from "./slices/expensesSlice";
export * from "./slices/userSlice";
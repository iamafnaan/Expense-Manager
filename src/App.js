import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ViewExpensesPage from "./pages/ViewExpensesPage";

function App() {
    return (
        <Routes>
            <Route element={<LoginPage />} path='/' />
            <Route element={<ViewExpensesPage />} path='/home' />
        </Routes>
    );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterForm } from "../pages/(auth)/register";
import { LoginForm } from "../pages/(auth)/Login";
import UserAuth from "../UserAuth";
const Approutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <div>
                        <h1>Hello</h1>
                    </div>
                } />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<UserAuth><RegisterForm /></UserAuth>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Approutes;
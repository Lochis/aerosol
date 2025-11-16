import { useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

export default function Auth() {

    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("signup");

    function handleShowPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setShowPassword(!showPassword);
    }


    return (
        <div>
            <h1 className="font-bold text-4xl mb-4">Aerosol</h1>

            <div className="tabs tabs-box">

                <input type="radio" name="auth_tabs" className="tab" aria-label="Login" checked={activeTab === "login"} onChange={() => setActiveTab("login")}/>
                <div className="tab-content w-full">
                    {/*Login Form*/}
                    <Login showPassword={showPassword} handleShowPassword={handleShowPassword} />
                </div>

                <input type="radio" name="auth_tabs" className="tab" aria-label="Sign Up" checked={activeTab === "signup"} onChange={() => setActiveTab("signup")} />
                <div className="tab-content">

                    {/*Sign Up Form*/}
                    <SignUp showPassword={showPassword} handleShowPassword={handleShowPassword} setActiveTab={setActiveTab} />

                </div>

            </div>
        </div>
    );
}
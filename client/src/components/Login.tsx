import { useState } from "react";
import {useNavigate } from "react-router";
import axios from "axios";

interface AuthProps {
    handleShowPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showPassword: boolean;
}

export default function Login({ handleShowPassword, showPassword }: AuthProps) {
    const [toastVisible, setToastVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function showToast() {
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 5000);
    }

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const response = await axios.post("http://localhost:3000/api/login", data, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Login successful:", response.data);
            navigate("/");

            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Login failed:", error.response?.data);
                setErrorMessage(error.response?.data?.error.message || "Login failed");
                showToast();
            } else {
                console.error("Login failed:", error);
            }
        }
    }


    return (
        <>
            <div className="toast toast-top toast-center" hidden={!toastVisible}>
                <div className="alert alert-danger">
                    <span>{errorMessage}</span>
                </div>
            </div>

            <form className="flex flex-col gap-4 items-center" onSubmit={handleLogin}>
                <fieldset className="fieldset bg-base-200 border-base-800 p-2 w-full flex flex-col items-center justify-center">
                    <label className="input validator">
                        <input name="email" type="email" placeholder="Email" required />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>

                    <div className="join max-w-xs lg:w-full">
                        <label className="input join-item">
                            <input name="password" id="login-password" type={showPassword ? "text" : "password"} placeholder="password" required />
                        </label>
                        <button className="btn btn-neutral join-item" onClick={handleShowPassword}>Show</button>
                    </div>

                </fieldset>
                <button type="submit" className="btn btn-primary w-full max-w-md">Login</button>
            </form>
        </>
    )
}
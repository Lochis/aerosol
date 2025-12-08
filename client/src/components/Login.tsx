import { useNavigate } from "react-router";
import { useAuth } from "../lib/auth";
import { useToast } from "./Toast";

interface AuthProps {
    handleShowPassword: (event: React.MouseEvent<HTMLElement>) => void;
    showPassword: boolean;
}

export default function Login({ handleShowPassword, showPassword }: AuthProps) {
    const navigate = useNavigate();
    const toast = useToast();
    const auth = useAuth();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const res = await auth.client.post("/login", data);
            console.log("Login successful:", res.data);
            auth.saveAuthFromResponse(res);
            navigate("/");
        } catch (error) {
            toast.error(error);
        }
    }


    return (
        <>
            <form className="flex flex-col gap-4 items-center" onSubmit={handleLogin}>
                <fieldset className="fieldset bg-base-200 border-base-800 p-2 w-full flex flex-col items-center justify-center">
                    <label className="input validator">
                        <input data-testid="login-email" name="email" type="email" placeholder="Email" required />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>

                    <div className="join max-w-xs lg:w-full">
                        <label className="input join-item">
                            <input data-testid="login-password" name="password" id="login-password" type={showPassword ? "text" : "password"} placeholder="password" required />
                        </label>
                        <div className="btn btn-neutral join-item" onClick={handleShowPassword}>Show</div>
                    </div>

                </fieldset>
                <button data-testid="login-submit" type="submit" className="btn btn-primary w-full max-w-md">Login</button>
            </form>
        </>
    )
}

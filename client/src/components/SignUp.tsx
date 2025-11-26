import { useAuth } from "../lib/auth";
import { useToast } from "./Toast";

interface AuthProps {
    handleShowPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showPassword: boolean;
    setActiveTab: (tab: string) => void;
}

export default function SignUp({ handleShowPassword, showPassword, setActiveTab }: AuthProps) {
    const toast = useToast();
    const auth = useAuth();

    async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = {
            email: formData.get("email"),
            name: formData.get("name"),
            tag: formData.get("tag"),
            password: formData.get("password"),
        };

        try {
            const response = await auth.client.post("/signup", data);
            console.log("Sign up successful:", response.data);
            setActiveTab("login");
        } catch (error) {
            toast.error(error);
        }
    }


    return (
        <>
            <form className="flex flex-col gap-4 w-full items-center" onSubmit={handleSignUp}>
                <fieldset className="fieldset bg-base-200 p-2 w-full flex flex-col items-center justify-center">
                    <label className="input validator">
                        <input name="email" type="email" placeholder="Email" required />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>

                    <input name="name" type="text" className="input" placeholder="Your Name" required />
                    <label className="input">
                        <span className="label">@</span>
                        <input name="tag" type="text" className="-ml-3" placeholder="tag" required />
                    </label>

                    <div className="join max-w-xs lg:w-full">
                        <label className="input join-item">
                            <input id="signup-password" name="password" type={showPassword ? "text" : "password"} placeholder="password" required />
                        </label>
                        <button className="btn btn-neutral join-item" onClick={handleShowPassword}>Show</button>
                    </div>

                </fieldset>
                <button type="submit" className="btn btn-primary w-full max-w-md">Create Account</button>
            </form>
        </>
    )
}

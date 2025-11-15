
interface AuthProps {
    handleShowPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showPassword: boolean;
}

export default function Login({ handleShowPassword, showPassword }: AuthProps) {
    return (
        <form className="flex flex-col gap-4 items-center">
            <fieldset className="fieldset bg-base-200 border-base-800 p-2 w-full flex flex-col items-center justify-center">
                <label className="input validator">
                    <input type="email" placeholder="Email" required />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>

                <div className="join max-w-xs lg:w-full">
                    <label className="input join-item">
                        <input id="login-password" type={showPassword ? "text" : "password"} placeholder="password" required />
                    </label>
                    <button className="btn btn-neutral join-item" onClick={handleShowPassword}>Show</button>
                </div>

            </fieldset>
            <button className="btn btn-primary w-full max-w-md">Login</button>
        </form>
    )
}
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useAuth } from "../lib/auth";
import type { User } from "../types/user.types";
import { useNavigate } from "react-router";

export default function Profile() {

    const [profile, setProfile] = useState<User>({} as User);
    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();
    const auth = useAuth();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await auth.api.get("/me");
                console.log("Profile fetched successfully:", response.data);
                setProfile(response.data.user);
            } catch (error) {
                showBoundary(error);
            }
        }
        if (auth.isAuthenticated()) {
            fetchProfile();
        }
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    }

    async function updateUserProfile() {
        const form = document.getElementById("profileForm") as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            tag: formData.get("tag"),
            name: formData.get("name"),
        };
        try {
            const response = await auth.api.put("/me", data);
            console.log("Profile update successful:", response.data);
        } catch (error) {
            showBoundary(error);
        }
    }

    async function deleteUserAccount() {
        try {
            const response = await auth.api.delete("/me");
            console.log("Account deletion successful:", response.data);
            auth.clearAuth();
            navigate("/auth");
        } catch (error) {
            showBoundary(error);
        }
    }

    return (
        <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold my-4">@{profile.tag}</h1>
            <form id="profileForm" className="flex flex-col gap-4 w-full max-w-md">
                <label className="input">
                    <span className="label">@</span>
                    <input type="text" placeholder="tag" name="tag" value={profile.tag} onChange={handleChange} />
                </label>
                <label className="input">
                    <span className="label">Name</span>
                    <input type="text" placeholder="name" name="name" value={profile.name} onChange={handleChange} />
                </label>
                <label className="input">
                    <span className="label">Email</span>
                    <input type="text" placeholder="email" name="email" value={profile.email} readOnly />
                </label>
                <label className="input">
                    <span className="label">Member Since</span>
                    <input type="text" placeholder="createdAt" name="createdAt" value={new Date(profile.createdAt).toLocaleDateString()} readOnly />
                </label>
            </form>

            <div className="flex flex-col md:flex-row md:justify-between mt-12 gap-4">
                <button className="btn btn-primary w-full lg:max-w-1/6" onClick={updateUserProfile}>Save Changes</button>
                {/* TODO: add confirmation dialog */}
                <button className="btn btn-danger w-full lg:max-w-1/6" onClick={deleteUserAccount}>Delete Account</button>
            </div>
        </div>
    );
}

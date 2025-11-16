import { useEffect, useState } from "react";
import { authFetch } from "../lib/auth";
import type { User } from "../types/user.types";

export default function Profile() {

    const [profile, setProfile] = useState<User>({} as User);

    useEffect(() => {
        async function fetchProfile() {
            const response = await authFetch("http://localhost:3000/api/me", {
                headers: { "Content-Type": "application/json" },
            });
            
            setProfile(response.data.data.user);
        }
        fetchProfile();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
            <form>
                <label className="input">
                    <span className="label">@</span>
                    <input type="text" placeholder="tag" value={profile.tag} readOnly />
                </label>
            </form>
        </div>
    );
}
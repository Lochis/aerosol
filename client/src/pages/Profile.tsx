import { useEffect } from "react";
import axios from "axios";

export default function Profile() {
    useEffect(() => {
        async function fetchProfile() {
            const response = await axios.get("http://localhost:3000/api/me", {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Profile data:", response.data);
        }
        fetchProfile();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
            <form>
                <label className="input">
                    <span className="label">@</span>
                    <input type="text" placeholder="tag" />
                </label>
            </form>
        </div>
    );
}
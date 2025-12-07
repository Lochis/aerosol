import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import PostFeed from "../components/PostFeed";
import { useToast } from "../components/Toast";
import type { User } from "../types/user.types";
import { useNavigate, useParams } from "react-router";

export default function Profile() {
    const { tag } = useParams<{ tag?: string }>();
    const [profile, setProfile] = useState<User>({} as User);
    const [isUserProfile, setIsUserProfile] = useState<boolean>(false);
    const navigate = useNavigate();
    const toast = useToast();
    const auth = useAuth();

    const deleteConfirmationModal = document.getElementById(
    "delete-confirmation-modal"
  ) as HTMLDialogElement | null;

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await auth.api.get("/me", { signal: controller.signal });
                console.log("Profile fetched successfully:", response.data);
                setProfile(response.data.user);
                setIsUserProfile(true);
            } catch (error) {
                if (error?.name === "CanceledError") return;
                toast.error(error);
                setIsUserProfile(false);
            }
        }

        async function fetchProfileByTag() {
            try {
                console.log("Fetching profile for tag:", tag);
                const response = await auth.api.get(`/users/${tag}`);
                console.log("Profile fetched by tag successfully:", response.data);
                setProfile(response.data);
                setIsUserProfile(false);
            } catch (error) {
                if (error?.name === "CanceledError") return;
                toast.error(error);
                setIsUserProfile(false);
            }
        }

        const controller = new AbortController();

        if (auth.isAuthenticated() && !tag) {
            fetchProfile();
            return () => { controller.abort(); }
        } else if (tag) {
            fetchProfileByTag();
            return () => { controller.abort(); }
        }
        
    }, [tag]);

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
            await auth.api.put("/me", data);
            toast.success("Profile update successful");
        } catch (error) {
            toast.error(error);
        }
    }

    async function deleteUserAccount() {
        try {
            await auth.api.delete("/me");
            toast.success("Account deletion successful");
            navigate("/auth");
            auth.clearAuth();
        } catch (error) {
            toast.error(error);
        }
    }

    function onDeleteAttempt () {
        deleteConfirmationModal?.showModal();
    }

    return (
        <div className="mx-auto max-w-7xl flex flex-row gap-4 ">
            <div className="flex-1">
            <h1 className="text-3xl font-bold my-4 text-secondary">@{profile.tag}</h1>
            <form id="profileForm" className="flex flex-col gap-4 w-full max-w-md">
                <label className="input">
                    <span className="label">@</span>
                    <input type="text" readOnly={!isUserProfile} placeholder="tag" name="tag" value={profile.tag} onChange={handleChange} />
                </label>
                <label className="input">
                    <span className="label">Name</span>
                    <input type="text" readOnly={!isUserProfile} placeholder="name" name="name" value={profile.name} onChange={handleChange} />
                </label>
                <label className="input" hidden={!isUserProfile}>
                    <span className="label">Email</span>
                    <input type="text" placeholder="email" name="email" value={profile.email} readOnly />
                </label>
                <label className="input">
                    <span className="label">Member Since</span>
                    <input type="text" placeholder="createdAt" name="createdAt" value={new Date(profile.createdAt).toLocaleDateString()} readOnly />
                </label>
            </form>

            <div hidden={!isUserProfile} className="flex flex-col gap-4 mt-4 max-w-md">
                <button className="btn btn-success max-w-xs" onClick={updateUserProfile}>Save Changes</button>
                {/* TODO: add confirmation dialog */}
                <button className="btn btn-soft btn-warning max-w-xs" onClick={onDeleteAttempt}>Delete Account</button>
            </div>
            <dialog className="modal" id="delete-confirmation-modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete your account?</h3>
                    <p className="py-4">This action cannot be undone.</p>
                    <div className="modal-action">
                        <button className="btn" onClick={() => {
                            const modal = document.getElementById("delete-confirmation-modal") as HTMLDialogElement;
                            modal.close();
                        }}>Cancel</button>
                        <button className="btn btn-error" onClick={deleteUserAccount}>Delete</button>
                    </div>
                </div>
            </dialog>
            </div>
            <div className="flex flex-1 flex-col w-full">
                <h1 className="text-3xl font-bold mx-auto my-2 text-secondary">{isUserProfile ? "Your Posts" : profile.tag + "'s Posts"}</h1>
                {profile._id && <PostFeed key={profile._id} userId={profile._id} />}
            </div>
            <div className="flex-1">
                {/* empty for spacing */}
            </div>
            
        </div>
    );
}

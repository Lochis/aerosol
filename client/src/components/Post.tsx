import Avatar from "boring-avatars";
import CommentIcon from "./icons/CommentIcon";
import RepostIcon from "./icons/RepostIcon";
import HeartIcon from "./icons/HeartIcon";
import type { Post as PostType } from "../types/post.types";
import { useState } from "react";
import { useAuth } from "../lib/auth";

export default function Post({ post }: { post: PostType }) {
    const auth = useAuth();
    const [editing, setEditing] = useState(false);
    const canEdit = post.author._id === auth.me._id && !editing;

    return (
        <div className="card bg-base-100 shadow-md border border-base-350 max-w-xl mx-auto mb-4">
            <div className="card-body p-4">

                {/* User info */}
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <Avatar
                                size={48}
                                name={post.author.name}
                                variant="beam"
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row w-full justify-between">
                        <div>
                            <h2 className="font-semibold text-sm">{post.author.name}</h2>
                            <p className="text-xs opacity-60">
                                @{post.author.tag} ·{" "}
                                {new Date(post.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {canEdit && (
                            <button
                                className="btn btn-ghost btn-sm btn-outline"
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* Post content */}
                {!editing ? (
                    <p className="mt-2">
                        {post.content}
                    </p>
                ) : (
                    <EditContent
                        post={post}
                        onExit={() => setEditing(false)}
                    />
                )}

                {/* Interaction buttons */}
                <div className="flex justify-between text-sm opacity-70">
                    <button className="btn btn-circle btn-ghost">
                        <CommentIcon />
                    </button>
                    <button className="btn btn-circle btn-ghost">
                        <RepostIcon />
                    </button>
                    <button className="btn btn-circle btn-ghost">
                        <HeartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

function EditContent({ post, onExit }: { post: PostType, onExit: () => void }) {
    const [pending, setPending] = useState(false);
    async function onSave() {
        setPending(true);
        setTimeout(() => {setPending(false); onExit()}, 1500);
    }

    return <div className="mt-2">
        <textarea className="textarea textarea-bordered w-full" value={post.content} disabled={pending} />
        <div className="flex gap-2 mt-2 justify-end">
            <button className="btn btn-primary btn-sm" onClick={onSave} disabled={pending}>Save</button>
            <button className="btn btn-outline btn-sm" onClick={onExit} disabled={pending}>Cancel</button>
        </div>
    </div>;
}

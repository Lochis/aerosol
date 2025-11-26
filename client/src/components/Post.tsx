import Avatar from "boring-avatars";
import CommentIcon from "./icons/CommentIcon";
import RepostIcon from "./icons/RepostIcon";
import HeartIcon from "./icons/HeartIcon";
import type { Post as PostType } from "../types/post.types";
import { useState } from "react";

export default function Post({ post }: { post: PostType }) {
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(post.content);

    function saveEdit() {
        // PAS de backend → sauvegarde locale seulement
        post.content = content;
        setEdit(false);
        alert("Post updated (local only)");
    }

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

                        {!edit && (
                            <button
                                className="btn btn-ghost btn-sm btn-outline"
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* Post content */}
                {!edit ? (
                    <p className="mt-2">
                        {content}
                    </p>
                ) : (
                    <div className="mt-2">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={saveEdit}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
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

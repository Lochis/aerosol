import Avatar from "boring-avatars";
import CommentIcon from "./icons/CommentIcon";
import RepostIcon from "./icons/RepostIcon";
import HeartIcon from "./icons/HeartIcon";
import type { Post as PostType } from "../types/post.types";

export default function Post({ post }: { post: PostType }) {
    return (
        <div className="card bg-base-100 shadow-md border border-base-350 max-w-xl mx-auto mb-4">
            <div className="card-body p-4">
                {/* User info */}
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <Avatar
                                size={48}
                                name="test"
                                variant="beam"
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-sm">{post.author.name}</h2>
                        <p className="text-xs opacity-60">@{post.author.tag} · {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* Post content */}
                <p className="mt-2">
                    {post.content}
                </p>

                {/* Optional image */}
                {/*{picture && (
                <div className="mt-2">
                    <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                        className="rounded-xl border border-base-300"
                    />
                </div>
                )}*/}
                

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
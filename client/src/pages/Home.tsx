import { useEffect, useState } from "react";
import Post from "../components/Post"
import { useAuth } from "../lib/auth";
import toasts from "../lib/toasts";
import type { Post as PostType } from "../types/post.types";

export default function Home() {
    const POST_LENGTH_THRESHOLD = 3;
    const data = "";
    const [postContent, setPostContent] = useState("");
    const [posts, setPosts] = useState<PostType[]>([]);
    const [date, setDate] = useState<Date | null>(new Date());
    const auth = useAuth();

    async function getPosts() {
        try {
            const response = await auth.api.get(`/posts?before=${date ? date.toISOString() : ""}`);
            console.log("Posts fetched successfully:", response.data);
            setPosts(response.data);
        } catch (error) {
            toasts.error(error);
        }
    }

    // Get posts on component mount
    useEffect(() => {
        async function fetchPosts() {
            await getPosts();
        }
        fetchPosts();
    }, []);


    async function createPost() {
        try {
            const response = await auth.api.post("/posts", { content: postContent });
            console.log("Post creation successful:", response.data);
            await getPosts();
        } catch (error) {
            toasts.error(error);
        }
    }

    async function editPost() {
        try {
            const response = await auth.api.patch("/posts", data);
            console.log("Post edited successfully:", response.data);
        } catch (error) {
            toasts.error(error);
        }
    }

    return (
        <div className="justify-center flex flex-col max-w-xl mx-auto">
            <div>
                <textarea className="textarea textarea-info w-full" placeholder="Post.." onChange={(e) => setPostContent(e.target.value)} value={postContent}>
                </textarea>
            </div>
            <button className="btn btn-soft btn-primary mt-2" onClick={createPost} hidden={postContent.length < POST_LENGTH_THRESHOLD}>Create Post</button>

            <div className="py-2">
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}


import { useEffect, useState } from "react";
import Post from "../components/Post"
import { authGet, authPost, authPatch } from "../lib/auth";
import type { Post as PostType } from "../types/post.types";
import axios from "axios";

export default function Home() {
    const POST_LENGTH_THRESHOLD = 3;
    const data = "";
    const [postContent, setPostContent] = useState("");
    const [posts, setPosts] = useState<PostType[]>([]);

    const [date, setDate] = useState<Date | null>(new Date());

    async function getPosts() {
        try {

            // TODO: Test once backend is ready
            const response = await axios.get("http://localhost:3000/api/posts?before=" + (date ? date.toISOString() : ""), {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Posts fetched successfully:", response.data);
            setPosts(response.data);

        } catch (error) {
            console.error("Error fetching posts:", error);
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
            const response = await authPost("http://localhost:3000/api/posts", { content: postContent }, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("Post creation successful:", response.data);
            await getPosts();
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    async function editPost() {
        try {
            const response = await authPatch("http://localhost:3000/api/posts", data, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Post edited successfully:", response.data);
        } catch (error) {
            console.error("Error editing post:", error);
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

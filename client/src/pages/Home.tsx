
import Post from "../components/Post"
import { authPost } from "../lib/auth";

export default function Home() {
    const data = "";

    async function createPost() {
        try {
            const response = await authPost("http://localhost:3000/api/posts", data, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("Post creation successful:", response.data);
        } catch (error) {
            console.error("Error creating post:", error);
        }



    }

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div>
            <div className="justify-center flex">
                <textarea className="textarea hover:textarea-success" placeholder="Post..">


                </textarea>
            </div>

            <div className="py-2">
                {items.map((id) => (
                    <Post key={id} picture={id % 2 === 0} />
                ))}
            </div>
        </div>
    )
}
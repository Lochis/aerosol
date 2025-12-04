import { useEffect, useState } from "react";
import Post from "../components/Post";
import { useAuth } from "../lib/auth";
import { useToast } from "../components/Toast";
import type { Post as PostType } from "../types/post.types";
import PreviewPostModal from "../components/PreviewPostModal";

type PostQuery = {
  before?: Date;
};

export default function Home() {
  const POST_LENGTH_THRESHOLD = 3;
  const data = "";
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [previewPostContent, setPreviewPostContent] = useState("");

  const toast = useToast();
  const auth = useAuth();

  async function getPosts({
    params,
    signal,
  }: {
    params?: PostQuery;
    signal?: AbortSignal;
  }) {
    try {
      const response = await auth.api.get("/posts", { params, signal });
      console.log("Posts fetched successfully:", response.data);
      setPosts(response.data);
    } catch (error) {
      if (error?.name === "CanceledError") return;
      toast.error(error);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    getPosts({ signal: controller.signal });
    return () => controller.abort();
  }, [auth]);

  async function createPost() {
    try {
      const response = await auth.api.post("/posts", { content: postContent });
      console.log("Post creation successful:", response.data);
      setPostContent("");
      await getPosts({});
    } catch (error) {
      toast.error(error);
    }
  }

  function previewPost() {
    setPreviewPostContent(postContent);
    const createDialog = document.getElementById(
      "preview-post-modal"
    ) as HTMLDialogElement | null;
    createDialog?.showModal();
  }

  function handlePostDelete(post: PostType) {
    setPosts(posts.filter((p) => p._id !== post._id));
  }

  function handlePostEdit(post: PostType) {
    setPosts(posts.map((p) => (p._id === post._id ? post : p)));
  }

  return (
    <div className="justify-center flex flex-col max-w-xl mx-auto">
      <PreviewPostModal
        postContent={previewPostContent}
        modalID="preview-post-modal"
      />
      <div>
        <textarea
          className="textarea textarea-info w-full mt-2"
          placeholder="Post.."
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
        ></textarea>
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-soft mt-2 flex-1"
          onClick={previewPost}
          hidden={postContent.length < POST_LENGTH_THRESHOLD}
        >
          Preview
        </button>
        <button
          className="btn btn-primary mt-2 flex-1"
          onClick={createPost}
          hidden={postContent.length < POST_LENGTH_THRESHOLD}
        >
          Create Post
        </button>
      </div>

      <div className="py-2">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onDelete={handlePostDelete}
            onEdit={handlePostEdit}
          />
        ))}
      </div>
    </div>
  );
}

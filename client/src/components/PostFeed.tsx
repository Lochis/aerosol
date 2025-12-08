import { useEffect, useState } from "react";
import Post from "./Post";
import { useAuth } from "../lib/auth";
import { useToast } from "./Toast";
import type { Post as PostType } from "../types/post.types";
import PreviewPostModal from "./PreviewPostModal";
import PostSkeleton from "./PostSkeleton";

type PostQuery = {
  before?: Date;
};

export default function PostFeed({ userId }: { userId?: string | null }) {
  const POSTS_PER_QUERY = 10; // HACK: manually synced with post.controller.ts
  const [posts, setPosts] = useState<PostType[]>([]);
  const toast = useToast();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [endOfPosts, setEndOfPosts] = useState(false);

  async function getPosts({
    params,
    signal,
  }: {
    params?: PostQuery;
    signal?: AbortSignal;
  }) {
    const url = userId ? `/posts/user/${userId}` : "/posts";
    try {
      setLoading(true);
      const response = await auth.api.get(url, { params, signal });
      console.log("Posts fetched successfully:", response.data);
      extendPosts(response.data);
      setEndOfPosts(response.data.length < POSTS_PER_QUERY);
    } catch (error) {
      if (error?.name === "CanceledError") return;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  function extendPosts(newPosts: PostType[]) {
    // Just in case we receive duplicate posts, skip them
    newPosts = newPosts.filter(p => posts.findIndex(old => old._id === p._id) < 0);
    setPosts(posts.concat(newPosts));
  }

  async function showMorePosts() {
    const latest = posts.at(-1);
    const before = latest && new Date(latest.createdAt);
    await getPosts({ params: { before } });
  }

  useEffect(() => {
    const controller = new AbortController();
    getPosts({ signal: controller.signal });
    return () => controller.abort();
  }, [auth]);

  async function createPost(payload: object) {
    const response = await auth.api.post("/posts", payload);
    console.log("Post creation successful:", response.data);
    await getPosts({});
  }

  function handlePostDelete(post: PostType) {
    setPosts(posts.filter((p) => p._id !== post._id));
  }

  function handlePostEdit(post: PostType) {
    setPosts(posts.map((p) => (p._id === post._id ? post : p)));
  }

  return (
    <div className="justify-center flex flex-col min-w-xl max-w-xl w-full mx-auto">
      {!userId && <CreatePostInput createPost={createPost} />}
      <div className="py-2">
        {loading && posts.length < 1 ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map(() => <PostSkeleton />)}
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                onDelete={handlePostDelete}
                onEdit={handlePostEdit}
              />
            ))}
          </>
        )}
        {!endOfPosts && posts.length > 0 && (
          <button onClick={showMorePosts} className="btn btn-sm rounded-xl w-full" disabled={loading}>
            {loading && <span className="loading loading-spinner" />}
            Show more posts
          </button>
        )}
      </div>
    </div>
  );
}

function CreatePostInput({
  createPost,
}: {
  createPost: (payload: object) => Promise<any>;
}) {
  const POST_LENGTH_THRESHOLD = 3;
  const [postContent, setPostContent] = useState("");
  const [previewPostContent, setPreviewPostContent] = useState("");
  const toast = useToast();

  async function onCreatePost() {
    try {
      await createPost({ content: postContent });
      setPostContent("");
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

  return (
    <>
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
          onClick={onCreatePost}
          hidden={postContent.length < POST_LENGTH_THRESHOLD}
        >
          Create Post
        </button>
      </div>
    </>
  );
}

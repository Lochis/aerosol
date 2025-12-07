import Avatar from "boring-avatars";
import CommentIcon from "./icons/CommentIcon";
import RepostIcon from "./icons/RepostIcon";
import HeartIcon from "./icons/HeartIcon";
import TrashIcon from "./icons/TrashIcon";
import DOMPurify from "dompurify";
import type MarkdownIt from "markdown-it";
import type { Post as PostType } from "../types/post.types";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { useToast } from "./Toast";
import PreviewPostModal from "./PreviewPostModal";

//const md = MarkdownIt({
//  breaks: true,
//  linkify: true,
//});
//const highlighter = await createHighlighter({
//  themes: Object.keys(bundledThemes),
//  langs: Object.keys(bundledLanguages),
//});
//md.use(fromHighlighter(highlighter, { theme: "tokyo-night" }));

let mdRendererPromise: Promise<MarkdownIt> | null = null;

async function getMarkdownRenderer(): Promise<MarkdownIt> {
  if (mdRendererPromise) return mdRendererPromise;

  mdRendererPromise = (async () => {
    const [
      { default: MarkdownIt },
      { fromHighlighter },
      { createHighlighter, bundledThemes, bundledLanguages },
    ] = await Promise.all([
      import("markdown-it"),
      import("@shikijs/markdown-it"),
      import("shiki/bundle/web"),
    ]);

    const md = MarkdownIt({
      breaks: true,
      linkify: true,
    });

    const highlighter = await createHighlighter({
      themes: Object.keys(bundledThemes),
      langs: Object.keys(bundledLanguages),
    });

    md.use(fromHighlighter(highlighter, { theme: "tokyo-night" }));

    return md;
  })();

  return mdRendererPromise;
}

export default function Post({
  post,
  onDelete,
  onEdit,
  preview = false,
}: {
  post: PostType;
  onDelete: (post: PostType) => void;
  onEdit: (post: PostType) => void;
  preview?: boolean;
}) {
  const auth = useAuth();
  const [editing, setEditing] = useState(false);
  const canEdit = post.author._id === auth.me._id && !editing;

  return (
    <div className="card bg-base-100 shadow-md border border-base-350 w-full mx-auto mb-4">
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
                @{post.author.tag} · {new Date(post.createdAt).toLocaleString()}
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
          <Content post={post} />
        ) : (
          <EditContent
            post={post}
            onDelete={onDelete}
            onEdit={onEdit}
            onExit={() => setEditing(false)}
          />
        )}

        {/* Interaction buttons */}
        <div className="flex justify-between text-sm opacity-70">
          <button className="btn btn-circle btn-ghost" disabled={preview}>
            <CommentIcon />
          </button>
          <button className="btn btn-circle btn-ghost" disabled={preview}>
            <RepostIcon />
          </button>
          <LikePost post={post} preview={preview} />
        </div>
      </div>
    </div>
  );
}

function Content({ post }: { post: PostType }) {
  const raw = post.content;
  const LONG_THRESHOLD = 300;
  const [expanded, setExpanded] = useState(false);
  const [renderedHTML, setRenderedHTML] = useState<string | null>(null);
  const [truncatedHTML, setTruncatedHTML] = useState<string | null>(null);

  useEffect(() => {
    getMarkdownRenderer().then((md) => {
      const fullHTML = DOMPurify.sanitize(md.render(raw));
      setRenderedHTML(fullHTML);

      if (raw.length > LONG_THRESHOLD) {
        const truncated = DOMPurify.sanitize(
          md.render(raw.slice(0, LONG_THRESHOLD) + "...")
        );
        setTruncatedHTML(truncated);
      }
    });
  }, [raw]);

  const canExpand = raw.length > LONG_THRESHOLD;

  return (
    <div className="mt-2">
      {canExpand && !expanded ? (
        <div
          className="prose prose-sm max-w-none markdown-body"
          dangerouslySetInnerHTML={{ __html: truncatedHTML || "" }}
        />
      ) : (
        <div
          className="prose prose-sm max-w-none markdown-body"
          dangerouslySetInnerHTML={{ __html: renderedHTML || "" }}
        />
      )}

      {canExpand ? (
        <button
          className="btn btn-link btn-xs mt-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

function EditContent({
  post,
  onDelete,
  onEdit,
  onExit,
}: {
  post: PostType;
  onDelete: (post: PostType) => void;
  onEdit: (post: PostType) => void;
  onExit: () => void;
}) {
  const auth = useAuth();
  const toast = useToast();
  const [pending, setPending] = useState(false);
  const [content, setContent] = useState(post.content);
  const canSave = !pending && content !== post.content;

  async function handleDelete() {
    setPending(true);

    try {
      await auth.api.delete(`/posts/${post._id}`);
      onDelete(post);
      toast.success(<span>Post deleted successfully.</span>);
      onExit();
    } catch (error) {
      toast.error(error);
    }

    setPending(false);
  }

  async function handleSave() {
    setPending(true);

    try {
      const res = await auth.api.patch(`/posts/${post._id}`, { content });
      onEdit(res.data);
      onExit();
    } catch (error) {
      toast.error(error);
    }

    setPending(false);
  }

  return (
    <div className="mt-2">
      <textarea
        className="textarea textarea-bordered w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={pending}
      />

      <div className="flex justify-between mt-2">
        <PreviewPostModal
          postContent={content}
          modalID={`edit-preview-post-modal`}
        />
        <button
          className="btn btn-soft btn-sm justify-self-start"
          onClick={() => {
            const previewDialog = document.getElementById(
              `edit-preview-post-modal`
            ) as HTMLDialogElement | null;
            previewDialog?.showModal();
          }}
        >
          Preview
        </button>

        <div className="flex gap-2 justify-end">
          <button
            className="btn btn-circle btn-ghost btn-sm opacity-70"
            onClick={handleDelete}
            disabled={pending}
          >
            <TrashIcon />
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSave}
            disabled={!canSave}
          >
            Save
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={onExit}
            disabled={pending}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function LikePost({
  post,
  preview = false,
}: {
  post: PostType;
  preview?: boolean;
}) {
  const toast = useToast();
  const auth = useAuth();
  const [likes, setLikes] = useState(post.likes ?? 0);
  const [liked, setLiked] = useState(
    post.likedBy?.includes(auth.me._id) ?? false
  );
  const [pending, setPending] = useState(false);

  async function handleLike() {
    if (pending) return;
    setPending(true);

    try {
      const res = await auth.api.post(`/posts/${post._id}/like`);
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (error) {
      toast.error(error);
    }

    setPending(false);
  }
  return (
    <button
      className={`btn btn-circle btn-ghost transition-transform duration-150 active:scale-90 ${
        liked ? "text-red-500 scale-110" : "scale-100"
      }`}
      onClick={handleLike}
      disabled={pending || preview}
      title={liked ? "Unlike" : "Like"}
    >
      <HeartIcon />
      <span className="text-xs">{likes}</span>
    </button>
  );
}

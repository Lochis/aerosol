import CommentIcon from "./icons/CommentIcon";
import RepostIcon from "./icons/RepostIcon";
import HeartIcon from "./icons/HeartIcon";

export default function PostSkeleton() {
    return (
         <div className="skeleton bg-base-100 px-2 pt-6 border w-full ">
                    <div className="flex w-full flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="skeleton h-14 w-14 shrink-0 rounded-full"></div>
                        <div className="flex flex-col gap-4">
                          <div className="skeleton h-4 w-28"></div>
                          <div className="skeleton h-4 w-72"></div>
                        </div>
                      </div>
                      <div className="skeleton h-32 w-full"></div>
                    </div>
                    <div className="flex justify-between text-sm opacity-70">
                      <button className="btn btn-circle btn-ghost" disabled={true}>
                        <CommentIcon />
                      </button>
                      <button className="btn btn-circle btn-ghost" disabled={true}>
                        <RepostIcon />
                      </button>
                      <button className="btn btn-circle btn-ghost" disabled={true}>
                        <HeartIcon />
                      </button>
                    </div>
                  </div>
    );
}
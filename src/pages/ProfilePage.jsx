import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect, useState } from "react";
import { fetchUserPosts } from "../apis/postApi";

function ProfilePage() {
  const user = useUserStore((s) => s.user);
  const [userPosts, setUserPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    const loadUserPosts = async () => {
      setPostsLoading(true);
      setPostsError(null);
      try {
        const { posts } = await fetchUserPosts(user.id);
        setUserPosts(posts);
      } catch (e) {
        setPostsError(e.message);
      } finally {
        setPostsLoading(false);
      }
    };
    loadUserPosts();
  }, [user.id]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">내 정보</h1>
      <div className="bg-base-100 shadow p-6 rounded w-full max-w-md">
        <p className="mb-2">
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        {user.user_metadata?.full_name && (
          <p className="mb-2">
            <span className="font-semibold">Name:</span>{" "}
            {user.user_metadata.full_name}
          </p>
        )}
        <button
          className="btn btn-error mt-4"
          onClick={() => {
            useUserStore.getState().clearUser();
          }}
        >
          로그아웃
        </button>
      </div>
      <div className="bg-base-100 shadow p-6 rounded w-full max-w-md mt-8">
        <h2 className="text-xl font-bold mb-4">내가 쓴 글</h2>
        {postsLoading ? (
          <div>로딩 중...</div>
        ) : postsError ? (
          <div className="text-red-500">에러: {postsError}</div>
        ) : userPosts.length === 0 ? (
          <div>작성한 글이 없습니다.</div>
        ) : (
          <ul className="list-disc pl-5">
            {userPosts.map((post) => (
              <li key={post.id} className="mb-2">
                <span className="font-semibold">{post.title}</span>
                <span className="ml-2 text-gray-500 text-sm">
                  {post.created_at.split("T")[0]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

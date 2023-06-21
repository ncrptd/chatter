import ProfileCard from '../components/ProfileCard';
import { useUser } from '../context/UserContext';
import PostCard from '../components/PostCard';
import { useParams } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import PostSkeletonCard from '../components/skeletons/PostSkeletonCard';

export default function Profile() {
  const { state: userState } = useUser();
  const { allUsers } = userState;
  const { userId } = useParams();

  const user = allUsers.find((user) => user?._id === userId);

  const { state: postState } = usePost();
  const { posts } = postState;
  const userPosts = posts
    .filter((post) => post.userId === userId)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const noOfPosts = posts.filter((post) => post.userId === user._id);

  return (
    <div>
      <h1 className="p-2 font-semibold bg-gray-800 border-x border-slate-500 text-center">
        {user?.fullName}{' '}
        <p className="font-thin text-slate-300">{noOfPosts.length} Posts</p>
      </h1>
      {user && <ProfileCard user={user} />}
      {userPosts.length < 1 ? (
        <PostSkeletonCard />
      ) : (
        userPosts.map((post) => <PostCard post={post} key={post._id} />)
      )}
    </div>
  );
}

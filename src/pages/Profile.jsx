import ProfileCard from '../components/ProfileCard';
import { useUser } from '../context/UserContext';
import PostCard from '../components/PostCard';
import { useParams } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import PostSkeletonCard from '../components/skeletons/PostSkeletonCard';
import { useState } from 'react';
import Goback from '../components/Goback';

export default function Profile() {
  const [disableFollow, setDisableFollow] = useState(false);
  const [disableLike, setDisableLike] = useState(false);
  const [disableBookmark, setDisableBookmark] = useState(false);

  const { state: userState } = useUser();
  const { allUsers } = userState;
  const { userId } = useParams();
  const user = allUsers.find((user) => user?._id === userId);

  const { state: postState } = usePost();
  const { posts } = postState;

  const getProfileUserPost = (posts) => {
    if (!posts) {
      return posts
    }
    return posts.filter((post) => post.userId === userId)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }
  const userPosts = getProfileUserPost(posts);

  const noOfPosts = userPosts ? posts.filter((post) => post?.userId === user?._id) : [];

  return (
    <div className='bg-slate-900'>

      <div className="text-center p-2  bg-gray-800 border-x border-slate-500 flex justify-between items-center overflow-clip">
        <Goback />
        <div>
          <p>{user?.fullName}{' '}</p>
          <p className="font-thin text-slate-300 word-breaks w-full overflow-clip">{noOfPosts.length} Posts</p>
        </div>
        <div></div>
      </div>

      {user && <ProfileCard user={user} disableFollow={disableFollow} setDisableFollow={setDisableFollow} />}
      {
        !userPosts ? (
          <PostSkeletonCard />
        ) : userPosts.length <= 0 ? <p className='text-center font-bold uppercase p-6 '>No Posts</p> : (
          userPosts.map((post) => <PostCard post={post} key={post._id} disableLike={disableLike} setDisableLike={setDisableLike} disableBookmark={disableBookmark} setDisableBookmark={setDisableBookmark} />)
        )
      }
    </div>
  );
}

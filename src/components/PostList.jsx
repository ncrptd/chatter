import React from 'react';
import PostCard from './PostCard';
import { usePost } from '../context/PostContext';
import PostSkeletonCard from './skeletons/PostSkeletonCard';
import { useUser } from '../context/UserContext';

export default function PostList() {
  const { state } = usePost();
  const { posts, postsFilterBy } = state;
  const { state: { userDetails, allUsers } } = useUser();
  const loggedInUser = allUsers.find((user) => user._id === userDetails?._id);
  const getLatestPostsData = (posts, postsFilterBy) => {
    if (!posts) {
      return posts
    }
    if (postsFilterBy === 'latest') {
      return [...posts].sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
    }
    return posts;
  };
  const getTrendingPostsData = (posts, postsFilterBy) => {
    if (!posts) {
      return posts
    }
    if (postsFilterBy === 'trending') {
      return [...posts].sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    }
    return posts;
  };

  const getFilteredPosts = (posts) => {
    if (!posts) {
      return posts
    }
    return posts.filter((post) => post.userId === loggedInUser?._id || loggedInUser?.following.find((user) => user._id === post.userId))
  }
  const filteredPosts = getFilteredPosts(posts);

  const trendingPostsData = getTrendingPostsData(
    filteredPosts,
    postsFilterBy
  );
  const latestPostsData = getLatestPostsData(trendingPostsData, postsFilterBy);

  const visiblePosts = latestPostsData;

  return (
    <div>
      {!visiblePosts ? <PostSkeletonCard /> : visiblePosts.length <= 0 ? <p className='text-center text-2xl font-bold uppercase mt-6'>No Posts Found</p> : visiblePosts.map((post) => <PostCard post={post} key={post._id} />)}
    </div>
  );
}

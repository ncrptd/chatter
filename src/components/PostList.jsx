import React from 'react';
import PostCard from './PostCard';
import { usePost } from '../context/PostContext';
import PostSkeletonCard from './skeletons/PostSkeletonCard';

export default function PostList() {
  const { state } = usePost();
  const { posts, postsFilterBy } = state;

  const getLatestPostsData = (posts, postsFilterBy) => {
    if (postsFilterBy === 'latest') {
      return [...posts].sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      );
    }
    return posts;
  };
  const getTrendingPostsData = (posts, postsFilterBy) => {
    if (postsFilterBy === 'trending') {
      return [...posts].sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    }
    return posts;
  };
  const latestPostsData = getLatestPostsData(posts, postsFilterBy);
  const trendingPostsData = getTrendingPostsData(
    latestPostsData,
    postsFilterBy
  );
  const visiblePosts = trendingPostsData;
  return (
    <div>
      {visiblePosts.length >= 1 ? (
        visiblePosts.map((post) => <PostCard post={post} key={post?._id} />)
      ) : (
        <PostSkeletonCard />
      )}
    </div>
  );
}

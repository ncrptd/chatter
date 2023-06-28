import React from 'react';
import PostCard from './PostCard';
import { usePost } from '../context/PostContext';
import PostSkeletonCard from './skeletons/PostSkeletonCard';
import { useUser } from '../context/UserContext';

export default function PostList() {
  const { state } = usePost();
  const { posts, postsFilterBy } = state;
  const { state: { userDetails } } = useUser();

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
    return posts.filter((post) => post.userId === userDetails?._id || userDetails?.following.find((user) => user._id === post.userId))
  }
  const filteredPosts = getFilteredPosts(posts);

  const trendingPostsData = getTrendingPostsData(
    filteredPosts,
    postsFilterBy
  );
  const latestPostsData = getLatestPostsData(trendingPostsData, postsFilterBy);

  const visiblePosts = latestPostsData;

  console.log(userDetails)
  return (
    <div>
      {!visiblePosts ? <PostSkeletonCard /> : visiblePosts.length <= 0 ? <p>No Posts Found</p> : visiblePosts.map((post) => <PostCard post={post} key={post._id} />)}
    </div>
  );
}

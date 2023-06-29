import React from 'react'
import { usePost } from '../context/PostContext'
import PostSkeletonCard from './skeletons/PostSkeletonCard';
import PostCard from './PostCard';

export default function ExploreList() {
    const { state } = usePost();
    const { posts } = state;

    return (
        <div>
            {!posts ? <PostSkeletonCard /> : posts.length <= 0 ? <p className='text-center text-2xl font-bold uppercase mt-6'>No Posts Found</p> : posts.map((post) => <PostCard post={post} key={post._id} />)}
        </div>
    )
}

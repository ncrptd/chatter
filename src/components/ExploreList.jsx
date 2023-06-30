import { usePost } from '../context/PostContext'
import PostSkeletonCard from './skeletons/PostSkeletonCard';
import PostCard from './PostCard';
import { useState } from 'react';

export default function ExploreList() {
    const [disableLike, setDisableLike] = useState(false);
    const [disableBookmark, setDisableBookmark] = useState(false);

    const { state } = usePost();
    const { posts } = state;

    return (
        <div>
            {!posts ? <PostSkeletonCard /> : posts.length <= 0 ? <p className='text-center text-2xl font-bold uppercase mt-6'>No Posts Found</p> : posts.map((post) => <PostCard post={post} key={post._id} disableLike={disableLike} setDisableLike={setDisableLike} disableBookmark={disableBookmark} setDisableBookmark={setDisableBookmark} />)}
        </div>
    )
}

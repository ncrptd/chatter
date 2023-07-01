import React, { useState } from 'react'
import PostCard from './PostCard';
import PostSkeletonCard from './skeletons/PostSkeletonCard';
import { usePost } from '../context/PostContext';
import { useUser } from '../context/UserContext';

export default function BookmarkList() {
    const [disableLike, setDisableLike] = useState(false);
    const [disableBookmark, setDisableBookmark] = useState(false);

    const { state: userState } = useUser();
    const { userDetails } = userState;
    const { state: postState } = usePost();
    const { posts } = postState;
    const visiblePosts = posts?.filter((post) => post._id === userDetails?.bookmarks.find((p) => p._id === post._id)?._id);

    return (
        <div>
            {!visiblePosts ? <PostSkeletonCard /> : visiblePosts.length <= 0 ? <p className='text-center text-2xl font-bold uppercase mt-6'>No Bookmarks Found</p> : visiblePosts.map((post) => <PostCard post={post} key={post._id} disableLike={disableLike} setDisableLike={setDisableLike} disableBookmark={disableBookmark} setDisableBookmark={setDisableBookmark} />)}
        </div>
    )
}

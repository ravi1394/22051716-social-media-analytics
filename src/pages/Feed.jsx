import React, { useContext, useEffect } from 'react';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import { DataContext } from '../context/DataContext';
import { getCommentCountForPost, getUserById } from '../utils/dataProcessing';

const Feed = () => {
const { feedPosts, users, comments, loading, error, refreshData } = useContext(DataContext);


useEffect(() => {

    const interval = setInterval(refreshData, 10000);
    
    return () => clearInterval(interval);
}, [refreshData]);

if (loading && feedPosts.length === 0) return <Loading />;

if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

return (
    <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest Posts</h2>
        
        <button
        onClick={refreshData}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        disabled={loading}
        >
        {loading ? (
            <>
            <span className="mr-2">Refreshing</span>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            </>
        ) : (
            <>
            <span className="mr-2">Refresh</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            </>
        )}
        </button>
    </div>
    
    <div className="flex flex-col space-y-6">
        {feedPosts.map(post => {
        const userData = getUserById(users, post.userId);
        const commentCount = getCommentCountForPost(comments, post.id);
        const postComments = comments.filter(comment => comment.postId === post.id);
        
        return (
            <PostCard
            key={post.id}
            post={post}
            userData={userData}
            commentCount={commentCount}
            comments={postComments}
            />
        );
        })}
    </div>
    
    {feedPosts.length === 0 && !loading && (
        <div className="text-center p-8 text-gray-500">
        No posts available.
        </div>
    )}
    </div>
);
};

export default Feed;
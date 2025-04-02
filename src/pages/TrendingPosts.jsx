import React, { useContext } from 'react';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import { DataContext } from '../context/DataContext';
import { getUserById } from '../utils/dataProcessing';

const TrendingPosts = () => {
const { trendingPosts, users, comments, loading, error } = useContext(DataContext);

if (loading) return <Loading />;

if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

return (
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-6">Trending Posts</h2>
    
    <div className="flex flex-col space-y-6">
        {trendingPosts.map(post => {
        const userData = getUserById(users, post.userId);
        const postComments = comments.filter(comment => comment.postId === post.id);
        
        return (
            <PostCard
            key={post.id}
            post={post}
            userData={userData}
            commentCount={post.commentCount}
            comments={postComments}
            />
        );
        })}
    </div>
    
    {trendingPosts.length === 0 && (
        <div className="text-center p-8 text-gray-500">
        No trending posts available.
        </div>
    )}
    </div>
);
};

export default TrendingPosts;
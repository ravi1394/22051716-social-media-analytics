import React, { useState } from 'react';
import { formatTimestamp } from '../utils/dataProcessing';
import { getRandomPostImage } from '../utils/imageUtils';

const PostCard = ({ post, userData, commentCount, comments = [] }) => {
const [showComments, setShowComments] = useState(false);

return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Post Header */}
    <div className="p-4 flex items-center">
        <img
        src={getRandomAvatar(post.userId)}
        alt={userData.name}
        className="w-10 h-10 rounded-full mr-3"
        />
        <div>
        <h3 className="font-semibold">{userData.name}</h3>
        <p className="text-gray-500 text-sm">{formatTimestamp(post.timestamp)}</p>
        </div>
    </div>
    
      {/* Post Image */}
    <img
        src={getRandomPostImage(post.id)}
        alt="Post content"
        className="w-full h-64 object-cover"
    />
    
      {/* Post Content */}
    <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700">{post.body}</p>
    </div>
    
      {/* Post Statistics */}
    <div className="px-4 py-2 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center">
        <button
            className="flex items-center text-blue-600 hover:underline"
            onClick={() => setShowComments(!showComments)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            {commentCount} Comments
        </button>
        </div>
        
        {post.commentCount && (
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
            Trending 🔥
        </div>
        )}
    </div>
    
      {/* Comments Section */}
    {showComments && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
        <h4 className="font-semibold mb-2">Comments</h4>
        {comments.length > 0 ? (
            comments.map(comment => (
            <div key={comment.id} className="mb-3 bg-white p-3 rounded-md shadow-sm">
                <div className="flex items-center mb-1">
                <img
                    src={getRandomAvatar(comment.userId)}
                    alt="Commenter"
                    className="w-6 h-6 rounded-full mr-2"
                />
                <span className="font-semibold text-sm">{comment.name}</span>
                </div>
                <p className="text-gray-700 text-sm">{comment.body}</p>
            </div>
            ))
        ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
        </div>
    )}
    </div>
);
};

export default PostCard;

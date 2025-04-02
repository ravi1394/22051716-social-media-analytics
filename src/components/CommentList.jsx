import React from 'react';
import { getRandomAvatar } from '../utils/imageUtils';

const CommentList = ({ comments }) => {
if (!comments || comments.length === 0) {
    return <p className="text-gray-500">No comments available.</p>;
}

return (
    <div className="space-y-4 mt-4">
    {comments.map(comment => (
        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
            <img
            src={getRandomAvatar(comment.userId)}
            alt={comment.name}
            className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">{comment.name}</span>
        </div>
        <p className="text-gray-700">{comment.body}</p>
        </div>
    ))}
    </div>
);
};

export default CommentList;
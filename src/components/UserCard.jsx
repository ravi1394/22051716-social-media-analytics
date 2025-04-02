import React from 'react';
import { getRandomAvatar } from '../utils/imageUtils';

const UserCard = ({ user, rank }) => {
return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="mr-4 relative">
        {rank && (
        <div className="absolute -top-3 -left-3 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {rank}
        </div>
        )}
        <img
        src={getRandomAvatar(user.id)}
        alt={user.name}
        className="rounded-full w-16 h-16 object-cover"
        />
    </div>
    <div className="flex-1">
        <h3 className="text-xl font-bold">{user.name}</h3>
        <p className="text-gray-600">@{user.username}</p>
        <div className="mt-2 flex items-center">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {user.postCount} Posts
        </span>
        </div>
    </div>
    </div>
);
};

export default UserCard;
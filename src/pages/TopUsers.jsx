import React, { useContext } from 'react';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';
import { DataContext } from '../context/DataContext';

const TopUsers = () => {
const { topUsers, loading, error } = useContext(DataContext);

if (loading) return <Loading />;

if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

return (
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-6">Top 5 Users by Post Count</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topUsers.map((user, index) => (
        <UserCard
            key={user.id}
            user={user}
            rank={index + 1}
        />
        ))}
    </div>
    
    {topUsers.length === 0 && (
        <div className="text-center p-8 text-gray-500">
        No user data available.
        </div>
    )}
    </div>
);
};

export default TopUsers;
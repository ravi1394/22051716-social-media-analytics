
import React, { createContext, useCallback, useEffect, useState } from 'react';
import API, { register } from '../services/api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
const [users, setUsers] = useState([]);
const [posts, setPosts] = useState([]);
const [comments, setComments] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [initialized, setInitialized] = useState(false);


const topUsers = users
    .map(user => {
    const userPosts = posts.filter(post => post.userId === user.id);
    return { ...user, postCount: userPosts.length };
    })
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);


const trendingPosts = React.useMemo(() => {
    if (!posts.length || !comments.length) return [];
    

    const commentCounts = posts.map(post => {
    const postComments = comments.filter(comment => comment.postId === post.id);
    return { ...post, commentCount: postComments.length };
    });
    
    
    const maxComments = Math.max(...commentCounts.map(post => post.commentCount));
    

    return commentCounts
    .filter(post => post.commentCount === maxComments)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}, [posts, comments]);


const feedPosts = React.useMemo(() => {
    return [...posts]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}, [posts]);


const initialize = useCallback(async () => {
    try {
    setLoading(true);

    await register();
    
    
    const { users, posts, comments } = await API.refreshAllData();
    
    setUsers(users);
    setPosts(posts);
    setComments(comments);
    setInitialized(true);
    } catch (err) {
    setError(err.message);
    } finally {
    setLoading(false);
    }
}, []);


const refreshData = useCallback(async () => {
    if (!initialized) return;
    
    try {
    setLoading(true);
    const { users, posts, comments } = await API.refreshAllData();
    
    setUsers(users);
    setPosts(posts);
    setComments(comments);
    } catch (err) {
    setError(err.message);
    } finally {
    setLoading(false);
    }
}, [initialized]);


useEffect(() => {
    initialize();
    
    
    const interval = setInterval(refreshData, 30000);
    
    return () => clearInterval(interval);
}, [initialize]);

return (
    <DataContext.Provider
    value={{
        users,
        posts,
        comments,
        topUsers,
        trendingPosts,
        feedPosts,
        loading,
        error,
        refreshData
    }}
    >
    {children}
    </DataContext.Provider>
);
};
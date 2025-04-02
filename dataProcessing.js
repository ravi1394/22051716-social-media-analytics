export const getRandomAvatar = (userId) => {
    const seed = userId || Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`;
};


export const getRandomPostImage = (postId) => {
    const seed = postId || Math.random().toString(36).substring(7);
    const width = 600;
    const height = 400;
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};


export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};


export const getUserById = (users, userId) => {
    return users.find(user => user.id === userId) || {
    name: 'Unknown User',
    username: 'unknown'
    };
};
export const getCommentCountForPost = (comments, postId) => {
    return comments.filter(comment => comment.postId === postId).length;
};
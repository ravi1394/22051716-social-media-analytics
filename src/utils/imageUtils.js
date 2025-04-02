// src/utils/imageUtils.js

// For user avatars (existing function)
export const getRandomAvatar = (userId) => {
    const avatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3"
    ];
    return avatars[userId % avatars.length];
};

  // Add this new function for post images
export const getRandomPostImage = (postId) => {
    const postImages = [
    "https://picsum.photos/500/300?nature",
    "https://picsum.photos/500/300?tech",
    "https://picsum.photos/500/300?people"
    ];
    return postImages[postId % postImages.length];
};
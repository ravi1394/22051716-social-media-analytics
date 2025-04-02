export const getRandomAvatar = () => {
    // Example avatar URLs (replace with your own)
    const avatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
};

import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';

const registrationData = {
email: "ravisingh18879@gmail.com",
name: "Ravi Shankar",
mobileNo: "9508511109",
githubUsername: "ravi1394",
rollNo: "22051716",
collegeName: "KIIT University",
accessCode: "nwpwrZ"
};

export const register = async () => {
try {
    const response = await axios.post(`${BASE_URL}/register`, registrationData);
    localStorage.setItem('authToken', response.data.token);
    return response.data;
} catch (error) {
    console.error('Registration failed:', error);
    throw error;
}
};

const getAuthHeader = () => {
const token = localStorage.getItem('authToken');
return token ? { Authorization: `Bearer ${token}` } : {};
};

class APIService {
constructor() {
    this.cache = {
    users: { data: null, timestamp: null },
    posts: { data: null, timestamp: null },
    comments: { data: null, timestamp: null }
    };
    this.cacheLifetime = 60000; // 1 minute cache
}

isCacheValid(key) {
    if (!this.cache[key]?.data || !this.cache[key]?.timestamp) return false;
    return (Date.now() - this.cache[key].timestamp) < this.cacheLifetime;
}

async getUsers() {
    if (this.isCacheValid('users')) {
    return this.cache.users.data;
    }

    try {
    const response = await axios.get(`${BASE_URL}/users`, {
        headers: getAuthHeader()
    });
    this.cache.users = {
        data: response.data,
        timestamp: Date.now()
    };
    return response.data;
    } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
    }
}

async getPosts() {
    if (this.isCacheValid('posts')) {
    return this.cache.posts.data;
    }

    try {
    const response = await axios.get(`${BASE_URL}/posts`, {
        headers: getAuthHeader()
    });
    this.cache.posts = {
        data: response.data,
        timestamp: Date.now()
    };
    return response.data;
    } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
    }
}

async getComments() {
    if (this.isCacheValid('comments')) {
    return this.cache.comments.data;
    }

    try {
    const response = await axios.get(`${BASE_URL}/comments`, {
        headers: getAuthHeader()
    });
    this.cache.comments = {
        data: response.data,
        timestamp: Date.now()
    };
    return response.data;
    } catch (error) {
    console.error('Failed to fetch comments:', error);
    throw error;
    }
}

async refreshAllData() {
    try {
    const [users, posts, comments] = await Promise.all([
        this.getUsers(),
        this.getPosts(),
        this.getComments()
    ]);

    return { users, posts, comments };
    } catch (error) {
    console.error('Failed to refresh data:', error);
    throw error;
    }
}

clearCache() {
    this.cache = {
    users: { data: null, timestamp: null },
    posts: { data: null, timestamp: null },
    comments: { data: null, timestamp: null }
    };
}
}

// Create named instance
const apiService = new APIService();

// Export the instance as default
export default apiService;
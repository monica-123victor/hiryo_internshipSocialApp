import { Post, Comment , User } from '../types';

const BASE_URL = 'https://gorest.co.in/public/v2';

export async function getPosts(): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return response.json();
}

export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`);
    }
    return response.json();
}
export async function getUserById(userId: number): Promise<User | null> {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        if (!response.ok) return null;
        return response.json();
    } catch {
        return null;
    }
}
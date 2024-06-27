import { vi, describe, beforeEach, it, expect } from 'vitest';
import { mockPosts, mockUsers, mockComments } from '../src/mocks';
import { fetchData, fetchPosts, fetchUsers, fetchComments } from '../src/apis';
import PostManager from '../src/postManager';
import axios from 'axios';

vi.mock('axios'); // Mock axios for testing
vi.mock('../src/apis', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        fetchPosts: vi.fn().mockResolvedValue(mockPosts),
        fetchUsers: vi.fn().mockResolvedValue(mockUsers),
        fetchComments: vi.fn().mockResolvedValue(mockComments),
    };
});

// vi.mock('../src/apis', () => ({
//     fetchPosts: vi.fn().mockResolvedValue([
//         { userId: 1, id: 1, title: "Post 1", body: "This is the body of post 1" },
//         { userId: 1, id: 2, title: "Post 2", body: "This is the body of post 2" },
//     ]),
//     fetchUsers: vi.fn().mockResolvedValue([
//         { id: 1, name: "User 1", username: "user1", email: "user1@example.com" },
//         { id: 2, name: "User 2", username: "user2", email: "user2@example.com" },
//     ]),
//     fetchComments: vi.fn().mockResolvedValue([
//         { postId: 1, id: 1, name: "Commenter 1", email: "commenter1@example.com", body: "This is the comment body 1" },
//         { postId: 1, id: 2, name: "Commenter 2", email: "commenter2@example.com", body: "This is the comment body 2" },
//     ]),
// }));

describe('Integration Test for Index', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear all mock calls before each test
    });

    it('should fetch data correctly', async () => {
        // Mock axios behavior for fetchData function
        (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockPosts });

        const posts = await fetchData<Post[]>('https://jsonplaceholder.typicode.com/posts');
        expect(posts).toEqual(mockPosts);
    });
    it('should fetch posts correctly in PostManager', async () => {
        // Mock axios behavior for fetchPosts function
        (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockPosts });

        const postManager = new PostManager();
        await postManager.loadPosts();

        expect(postManager['posts']).toEqual(mockPosts);
    });

    it('should fetch users correctly in PostManager', async () => {
        // Mock axios behavior for fetchUsers function
        (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockUsers });

        const postManager = new PostManager();
        await postManager.loadUsers();

        expect(postManager['users']).toEqual(mockUsers);
    });

    it('should fetch comments correctly in PostManager', async () => {
        // Mock axios behavior for fetchComments function
        (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockComments });

        const postManager = new PostManager();
        await postManager.loadComments();

        expect(postManager['comments']).toEqual(mockComments);
    });

    it('should display and manage posts correctly in PostManager', async () => {
        // Mock axios behavior for all fetch functions
        (axios.get as vi.Mock)
            .mockResolvedValueOnce({ data: mockPosts })
            .mockResolvedValueOnce({ data: mockUsers })
            .mockResolvedValueOnce({ data: mockComments });

        const postManager = new PostManager();
        await postManager.loadPosts();
        await postManager.loadUsers();
        await postManager.loadComments();

        const displayOutput = postManager.displayPosts();
        expect(displayOutput).toEqual([
            "Title: Post 1",
            "Author: User 1",
            "Body: This is the body of post 1",
            "Comments:",
            " - This is the comment body 1 (by Commenter 1)",
            " - This is the comment body 2 (by Commenter 2)",
            "---",
            "Title: Post 2",
            "Author: User 1",
            "Body: This is the body of post 2",
            "Comments:",
            "---",

        ]);

        const manageOutput = await postManager.managePosts();
        expect(manageOutput).toEqual({
            posts: mockPosts,
            users: mockUsers,
            comments: mockComments,
        });
    });
});

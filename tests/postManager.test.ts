import { vi, describe, beforeEach, it, expect } from 'vitest';
import { mockPosts, mockUsers, mockComments } from '../src/mocks';
import PostManager from '../src/postManager';

vi.mock('../src/apis', () => ({
    fetchPosts: vi.fn().mockResolvedValue(mockPosts),
    fetchUsers: vi.fn().mockResolvedValue(mockUsers),
    fetchComments: vi.fn().mockResolvedValue(mockComments),
}));

describe('PostManager', () => {
    let postManager: PostManager;

    beforeEach(() => {
        postManager = new PostManager();
        vi.clearAllMocks(); // Clear all mock calls before each test        
    });

    it('should load posts correctly', async () => {
        await postManager.loadPosts();
        expect(postManager['posts']).toHaveLength(2); // Check if posts are loaded correctly
        expect(postManager['posts']).toEqual(mockPosts);
    });

    it('should load users correctly', async () => {
        await postManager.loadUsers();
        expect(postManager['users']).toHaveLength(2); // Check if users are loaded correctly
        expect(postManager['users']).toEqual(mockUsers);
    });

    it('should load comments correctly', async () => {
        await postManager.loadComments();
        expect(postManager['comments']).toHaveLength(2); // Check if comments are loaded correctly
        expect(postManager['comments']).toEqual(mockComments);
    });

    it('should display posts correctly', async () => {
        const postManager = new PostManager();
        await postManager.loadPosts();
        await postManager.loadUsers();
        await postManager.loadComments();

        const displayOutput = postManager.displayPosts();
        const expectedOutput = [
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
            "---"
        ];
        expect(displayOutput).toEqual(expectedOutput);
    });



    it('should manage posts correctly', async () => {
        const manageOutput = await postManager.managePosts();
        expect(manageOutput).toEqual({
            posts: mockPosts,
            users: mockUsers,
            comments: mockComments,
        });        
        expect(manageOutput).toEqual({
            posts: mockPosts,
            users: mockUsers,
            comments: mockComments,
        });
        expect(manageOutput).toEqual({
            posts: expect.arrayContaining([
                expect.objectContaining({ title: "Post 1" }),
                expect.objectContaining({ title: "Post 2" }),
            ]),
            users: expect.arrayContaining([
                expect.objectContaining({ name: "User 1" }),
                expect.objectContaining({ name: "User 2" }),
            ]),
            comments: expect.arrayContaining([
                expect.objectContaining({ body: "This is the comment body 1" }),
                expect.objectContaining({ body: "This is the comment body 2" }),
            ]),
        });
    });
});

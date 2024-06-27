import {
	Post,
	User,
	Comment
} from '../schemas'

const mockPosts: Post[] = [
	{ userId: 1, id: 1, title: "Post 1", body: "This is the body of post 1" },
	{ userId: 1, id: 2, title: "Post 2", body: "This is the body of post 2" },
];

const mockUsers: User[] = [
	{ id: 1, name: "User 1", username: "user1", email: "user1@example.com" },
	{ id: 2, name: "User 2", username: "user2", email: "user2@example.com" },
];

const mockComments: Comment[] = [
	{ postId: 1, id: 1, name: "Commenter 1", email: "commenter1@example.com", body: "This is the comment body 1" },
	{ postId: 1, id: 2, name: "Commenter 2", email: "commenter2@example.com", body: "This is the comment body 2" },
];

export {
	mockPosts,
	mockUsers,
	mockComments
}
import { 
	fetchPosts, 
	fetchUsers, 
	fetchComments,
} from './apis';

import {
	Post,
	User,
	Comment
} from './schemas'

class PostManager {
	private posts: Post[] = [];
	private users: User[] = [];
	private comments: Comment[] = [];

	async loadPosts() {
		this.posts = await fetchPosts();
	}

	async loadUsers() {
		this.users = await fetchUsers();
	}

	async loadComments() {
		this.comments = await fetchComments();
	}

	displayPosts() {
		this.posts.forEach(post => {
			const user = this.users.find(u => u.id === post.userId);
			const postComments = this.comments.filter(c => c.postId === post.id);
			console.log(`Title: ${post.title}`);
			console.log(`Author: ${user ? user.name: 'Unknown'}`);
			console.log(`Body: ${post.body}`);
			console.log('Comments:');
			postComments.forEach(comment => {
				console.log(` - ${comment.body} (by ${comment.name})`);
			})
			console.log('---')
		})
	}

}

export default PostManager;
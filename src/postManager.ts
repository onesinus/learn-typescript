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
		this.posts = await fetchPosts()
	}

	async loadUsers() {
		this.users = await fetchUsers()
	}

	async loadComments() {
		this.comments = await fetchComments()
	}

	displayPosts() {
		this.posts.forEach(post => {
			const user = this.users.find(u => u.id === post.userId);
			const postComments = this.comments.filter(c => c.postId === post.id);
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>> all data <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n")
			console.log("POST => " + JSON.stringify(post))
			console.log("USER => " +JSON.stringify(user))
			console.log("POST COMMENT => " +JSON.stringify(postComments))
			console.log("====================================================================== \n")

			console.log(">>>>>>>>>>>>>>>>>>>>>>>>> data <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
			console.log(`Title: ${post.title}`);
			console.log(`Author: ${user ? user.name: 'Unknown'}`);
			console.log(`Body: ${post.body}`);
			console.log('Comments:');
			postComments.forEach(comment => {
				console.log(` - ${comment.body} (by ${comment.name})`);
			})
			console.log('---')
			console.log("====================================================================== \n")
		})
	}

	isPost(value: any): value is Post {
		return typeof value === 'object' && 'userId' in value && 'title' in value;
	}

	async managePosts() {
		try {
			const posts: Post[] = await fetchPosts();
			const users: User[] = await fetchUsers();
			const comments: Comment[] = await fetchComments();

			if (this.isPost(posts[0])) {
		    	console.log(`First post title: ${posts[0].title}`);
			}
		    console.log(JSON.stringify({posts, users, comments}));
		} catch (error) {
		    console.error('Error fetching data:', error);
		}
	}

}

export default PostManager;
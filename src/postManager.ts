import { fetchPosts, fetchUsers, fetchComments } from './apis';
import { Post, User, Comment } from './schemas';

class PostManager {
    private posts: Post[] = [];
    private users: User[] = [];
    private comments: Comment[] = [];

    async loadPosts(): Promise<Post[]> {
        this.posts = await fetchPosts();
        return this.posts;
    }

    async loadUsers(): Promise<User[]> {
        this.users = await fetchUsers();
        return this.users;
    }

    async loadComments(): Promise<Comment[]> {
        this.comments = await fetchComments();
        return this.comments;
    }

    displayPosts(): string[] {
        const result: string[] = [];

        this.posts.forEach(post => {
            const user = this.users.find(u => u.id === post.userId);
            const postComments = this.comments.filter(c => c.postId === post.id);

            result.push(`Title: ${post.title}`);
            result.push(`Author: ${user ? user.name : 'Unknown'}`);
            result.push(`Body: ${post.body}`);
            result.push('Comments:');
            postComments.forEach(comment => {
                result.push(` - ${comment.body} (by ${comment.name})`);
            });
            result.push('---');
        });

        result.forEach(line => console.log(line)); // Logging to console

        return result;
    }

    isPost(value: any): value is Post {
        return typeof value === 'object' && 'userId' in value && 'title' in value;
    }

    async managePosts(): Promise<{ posts: Post[], users: User[], comments: Comment[] } | null> {
        try {
            const posts: Post[] = await fetchPosts();
            const users: User[] = await fetchUsers();
            const comments: Comment[] = await fetchComments();

            if (this.isPost(posts[0])) {
                console.log(`First post title: ${posts[0].title}`);
            }

            console.log(JSON.stringify({ posts, users, comments })); // Logging to console

            return { posts, users, comments };
        } catch (error) {
            console.error('Error fetching data:', error);
            return null; // Or handle error as needed, such as throwing it further
        }
    }
}

export default PostManager;

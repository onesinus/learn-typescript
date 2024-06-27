import PostManager from './postManager';

async function main() {
	const postManager = new PostManager();
	await postManager.loadPosts();
	await postManager.loadUsers();
	await postManager.loadComments();
	postManager.displayPosts();

}

main().catch(error => console.error("Error in main function: ", error))
import axios from 'axios';
import {
	mockPosts,
	mockUsers,
	mockComments
} from '../mocks'

import {
	Post,
	User,
	Comment
} from '../schemas'

const IS_DEV = true;

export async function fetchData<T>(url: string): Promise<T> {
	try {
		const response = await axios.get<T>(url);
		return response.data
	} catch(error) {
	    throw new Error(`Error fetching data from url ${url}: ${error}`);
	}
}

export async function fetchPosts(): Promise<Post[]> {
	if (IS_DEV) {
		return Promise.resolve(mockPosts)
	} else {
		return fetchData<Post[]>('https://jsonplaceholder.typicode.com/posts');		
	}
}

export async function fetchUsers(): Promise<User[]> {
	if (IS_DEV) {
		return Promise.resolve(mockUsers)
	} else {
		return fetchData<User[]>('https://jsonplaceholder.typicode.com/users');
	}
}

export async function fetchComments(): Promise<Comment[]> {
	if (IS_DEV) {
		return Promise.resolve(mockComments)
	} else {
		return fetchData<Comment[]>('https://jsonplaceholder.typicode.com/comments');
	}	
}
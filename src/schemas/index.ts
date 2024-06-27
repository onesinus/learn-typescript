export type UserID = number;
export type PostID = number;

export interface User {
	id: Required<UserID>;
	name: string;
	username: string;
	email: Readonly<string>;
	address?: Address;
	company?: Partial<Company>
}

export interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Post {
	userId: UserID;
	id: PostID;
	title: string;
	body: string | undefined;
}

export interface Comment {
	postId: PostID;
	id: number;
	name: string;
	email: string;
	body: string;
}

export type PartialPost = Partial<Post>;
export type RequiredComment = Required<Comment>;
export type ReadonlyUser = Readonly<User>;
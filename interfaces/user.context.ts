interface User {
    username: string | null,
    email: string | null,
    profilePicture: string | null
}

export interface UserStateInterface {
	user: User | null
}
interface User {
    username: string | null,
    email: string | null,
    profilePicture?: string | null
    createdAt?: Date | string | null
}

export interface UserStateInterface {
	user: User | null
}
export interface SignUpInputInterface {
    name: string,
    email: string,
    password: string,
    profilePicture?: Blob | undefined
}

export interface SignUpOutpuInterface {
    message: string,
	user: {
		id: string,
		name: string
	}
}

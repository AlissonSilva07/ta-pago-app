interface GetUserOutputDto {
    id: string,
	name: string,
	email: string,
	profilePicture: Blob | null,
}

export interface UserStateInterface {
	user: GetUserOutputDto | null
}

export { GetUserOutputDto }
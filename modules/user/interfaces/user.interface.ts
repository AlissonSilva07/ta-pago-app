interface GetUserOutputDto {
    id: string,
	name: string,
	email: string,
	profilePicture: Blob | null,
	createdAt: Date | null
}

export { GetUserOutputDto }
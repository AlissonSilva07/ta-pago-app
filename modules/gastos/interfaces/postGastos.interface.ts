interface PostGastosInputDto {
    amount: number,
    title: string,
    description: string,
    category: string,
    isPaid: boolean,
    dueDate: Date
}

export { PostGastosInputDto }
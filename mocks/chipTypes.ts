interface ChipType {
    key: number,
    title: string,
    checked: boolean
}

export const chipTypes: ChipType[] = [
    {
        key: 0,
        title: 'Todos',
        checked: false
    },
    {
        key: 1,
        title: "Vencimento Próximo",
        checked: false
    },
    {
        key: 2,
        title: 'Vencimento Distante',
        checked: false
    },
    {
        key: 3,
        title: 'Ordem: A-Z',
        checked: false
    },
    {
        key: 4,
        title: 'Ordem: Z-A',
        checked: false
    }
] 
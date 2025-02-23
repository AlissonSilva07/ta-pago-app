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
        title: 'Vencido',
        checked: false
    },
    {
        key: 2,
        title: 'Mais Recentes',
        checked: false
    },
    {
        key: 3,
        title: 'Mais Antigos',
        checked: false
    },
    {
        key: 4,
        title: 'Maior Valor',
        checked: false
    },
    {
        key: 5,
        title: 'Menor Valor',
        checked: false
    }
] 
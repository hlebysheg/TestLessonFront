export enum FormMode {
    IP,
    OOO
}
export type ISelectMode = {
    value: FormMode,
    description: string;
} 
export const SelectModeValues: Array<ISelectMode> = [
    {
        value: FormMode.IP,
        description: 'Индивидуальный предприниматель (ИП)'
    },
    {
        value: FormMode.OOO,
        description: 'Общество с ограниченной ответственностью'
    }
]
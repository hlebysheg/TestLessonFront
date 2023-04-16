import { combine, createEffect, createEvent, createStore, restore, sample } from "effector";
import { validateStandartFormFx } from "./standartForm";
import { isNumeric } from "../validation/isNumber";
import { submitted } from "./formMode";

//todo не добалял проверку расчетного счета на валидность 
// т.к вроде это не требуется
export type PayFormType = {
    bik: string;
    bankName: string;
    checkingAccount: string;
    correspondentAccount: string;
}
export const sendData = createEvent();

//открытие формы после валидации 
export const $isPayFormOpen = createStore(false).on(validateStandartFormFx.doneData, () => true).reset(submitted)

//bik
export const changedBik = createEvent<string>()
export const validateFxBik = createEffect((form: PayFormType) => {
    if(form.bik === "" || form.bik == null){
        throw new Error('Введите значение')
    }
    if(!isNumeric(form.bik)) throw new Error('Введите цифры!!!!')
    return true;
}
)
export const $errorBik = restore<Error>(validateFxBik.failData, null).reset(changedBik)

//bankName
export const changedBankName = createEvent<string>()
export const validateFxBankName = createEffect((form: PayFormType) => {
    if(form.bankName === "" || form.bankName == null){
        throw new Error('Введите значение')
    }
    return true;
}
)
export const $errorBankName = restore<Error>(validateFxBankName.failData, null).reset(changedBankName)

//CheckingAccount
export const changedCheckingAccount = createEvent<string>()
export const validateFxCheckingAccount = createEffect((form: PayFormType) => {
    if(form.checkingAccount === "" || form.checkingAccount == null){
        throw new Error('Введите значение')
    }
    if(!isNumeric(form.checkingAccount)) throw new Error('Введите цифры!!!!')
    return true;
}
)
export const $errorCheckingAccount = restore<Error>(validateFxCheckingAccount.failData, null).reset(changedCheckingAccount)

//correspondentAccount
export const changedCorrespondentAccount = createEvent<string>()
export const validateFxCorrespondentAccount = createEffect((form: PayFormType) => {
    if(form.correspondentAccount === "" || form.correspondentAccount == null){
        throw new Error('Введите значение')
    }
    if(!isNumeric(form.correspondentAccount)) throw new Error('Введите цифры!!!!')
    return true;
}
)
export const $errorCorrespondentAccount = restore<Error>(validateFxCorrespondentAccount.failData, null).reset(changedCorrespondentAccount)

export const $payForm = combine({
    bik: restore(changedBik, '').reset(submitted),
    bankName: restore(changedBankName, '').reset(submitted),
    checkingAccount: restore(changedCheckingAccount, '').reset(submitted),
    correspondentAccount: restore(changedCorrespondentAccount, '').reset(submitted),
}).reset(submitted);

//ИНН: 3664069397, ОГРН: 1053600591197,
export const validatePayFormFx = createEffect<PayFormType, boolean>()
validatePayFormFx.use(validateFxBik)
validatePayFormFx.map(validateFxBankName)
validatePayFormFx.map(validateFxCheckingAccount)
validatePayFormFx.map(validateFxCorrespondentAccount)

export const sampleDone = sample({
    clock: sendData,
    source: $payForm,
    target: validatePayFormFx,
})
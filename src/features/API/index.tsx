import { createEffect, createStore, sample } from "effector";
import { $payForm, $standartForm, $formMode, $organisationForm, OrganisationFormType, PayFormType, StandartFormType, validatePayFormFx, submitted } from '@/features';
import { FormMode } from '@/Model';
import { delay } from "patronum";

const url = 'https://localhost:7184/Form';
export type fetchdata = {
    $standartForm: StandartFormType;
    $organisationForm: OrganisationFormType;
    $payForm: PayFormType;
    $formMode: FormMode
}
export const fetchFormFx = createEffect<fetchdata, boolean>()

fetchFormFx.use(async (store: fetchdata) => {
    

    if(store.$standartForm.innFile == null) throw ("upload inn file error");
    if(store.$standartForm.ogripFile == null) throw ("upload ogrip file error");
    if(store.$standartForm.egripFile == null) throw ("upload egrip file error");
    console.log('start send data')
    console.log(store)
    const org = new FormData();
    org.append('Organisation.OrganisationFullName', store.$organisationForm.organisationFullName)
    org.append('Organisation.OrganisationShortName', store.$organisationForm.organisationShortName)
    org.append('Organisation.Date', store.$organisationForm.date)
    org.append('PayInfo.Bik', store.$payForm.bik)
    org.append('PayInfo.BankName',store.$payForm.bankName)
    org.append('PayInfo.CheckingAccount', store.$payForm.checkingAccount)
    org.append('PayInfo.CorrespondentAccount', store.$payForm.correspondentAccount)
    org.append('IpInfo.Inn', store.$standartForm.inn)
    org.append('IpInfo.InnFile', store.$standartForm.innFile)
    org.append('IpInfo.Ogrip', store.$standartForm.ogrip)
    org.append('IpInfo.OgripFile', store.$standartForm.ogripFile)
    org.append('IpInfo.RegisterDate', store.$standartForm.registerDate)
    org.append('IpInfo.EgripFile', store.$standartForm.egripFile)
    if(!store.$standartForm.isDoc){
        if(store.$standartForm.rentFile == null) throw ("upload rent file error");
        org.append('pInfo.RentFile', store.$standartForm.rentFile)
    }


    const req = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        // headers: {
        // "Content-Type": "application/json",
        // // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: org, // body data type must match "Content-Type" header
    })
    if(req.status != 200) throw new("send error")
    return true;
})

fetchFormFx.doneData.watch(() => submitted())

export const sampleFetch = sample({
    clock: validatePayFormFx.doneData,
    source: {$organisationForm, $payForm, $standartForm, $formMode},
    target: fetchFormFx,
})

const delayedFail = delay({ source: fetchFormFx.fail, timeout: 3000 });
const delayedSucces = delay({ source: fetchFormFx.doneData, timeout: 3000 });

//message show
export const $messageMode = createStore({visable: false, isError: false})
                    .on(fetchFormFx.doneData, () =>  {
                        return {visable: true, isError: false}
                    })
                    .on(fetchFormFx.failData, () =>  {
                        return {visable: true, isError: true}
                    })
                    .reset(delayedFail)
                    .reset(delayedSucces)
// export const ShowMessageSucces = createEffect()

// ShowMessageSucces.use(async () => {

// })

// export const ShowMessageFail = createEffect()

// ShowMessageFail.use(async () => {

// })

// export const showSucces = sample({
//     clock: fetchFormFx.doneData,
//     target: ShowMessageSucces,
// })
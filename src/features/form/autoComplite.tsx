import { bikAutocomplite, FormMode, innPlaceHolders } from "@/Model";
import { createEffect, sample } from "effector";
import { $formMode } from "./formMode";
import { changedOrganisationFullName } from "./organisationForm";
import { $standartForm, changedInn, StandartFormType } from "./standartForm";
import { changedOrganisationShortName, changedOgrip, changedRegisterDateOrganisation, changedBik, $isPayFormOpen } from '@/features';
import { changedBankName, changedCorrespondentAccount } from './payForm';

//автозаполнение

export const watcher =changedInn.watch((inn) => {
    if(inn.length < 10 || $formMode.getState() === FormMode.IP) return;

    const bankObj = innPlaceHolders.find(el => el.inn === inn)
    if(bankObj == null) return

    changedOrganisationFullName(bankObj.fullName)
    changedOrganisationShortName(bankObj.shortName)
    changedOgrip(bankObj.ogrn)
    changedRegisterDateOrganisation(bankObj.registerDate)
})

export const PayWatcher =changedBik.watch((bik) => {
    if(bik.length < 5 || !$isPayFormOpen.getState()) return;

    const bankObj = bikAutocomplite.find(el => el.bik === bik)
    if(bankObj == null) return

    changedBankName(bankObj.fullName)
    changedCorrespondentAccount(bankObj.corrAcc)
})
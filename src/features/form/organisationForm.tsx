import {
  createEvent,
  createEffect,
  restore,
  sample,
  combine,
  createStore,
} from "effector";
import { standartSubmit, validateStandartFormFx } from "./standartForm";
import { StandartForm } from "@/widgets";
import { changeFormModeEvent, submitted } from "./formMode";

export const organisationSubmit = createEvent();

export type OrganisationFormType = {
  organisationFullName: string;
  organisationShortName: string;
  date: string;
};
//full
export const changedOrganisationFullName = createEvent<string>();
export const validateFxOranisationFullName = createEffect(
  (form: OrganisationFormType) => {
    if (form.organisationFullName === "" || form.organisationFullName == null) {
      throw new Error("Введите значение");
    }
    return true;
  }
);

export const $errorFull = restore<Error>(
  validateFxOranisationFullName.failData,
  null
).reset(changedOrganisationFullName);

//Short
export const changedOrganisationShortName = createEvent<string>();
export const validateFxOranisationShortName = createEffect(
  (form: OrganisationFormType) => {
    if (
      form.organisationShortName === "" ||
      form.organisationShortName == null
    ) {
      throw new Error("Введите значение");
    }
    return true;
  }
);

export const $errorShort = restore<Error>(
  validateFxOranisationShortName.failData,
  null
).reset(changedOrganisationShortName);

//data
//дата регистрации
export const changedRegisterDateOrganisation = createEvent<string>();
export const validateFxDateOrganisationReqire = createEffect(
  (form: OrganisationFormType) => {
    if (form.date === "" || form.date == null) {
      throw new Error("Введите значение");
    }
    return true;
  }
);
export const $errorRegisterDateOrganisation = restore<Error>(
  validateFxDateOrganisationReqire.failData,
  null
).reset(changedRegisterDateOrganisation);

export const $organisationForm = combine({
  organisationFullName: restore(changedOrganisationFullName, "").reset(
    submitted
  ),
  organisationShortName: restore(changedOrganisationShortName, "").reset(
    submitted
  ),
  date: restore(changedRegisterDateOrganisation, "").reset(submitted),
})
  .reset(changeFormModeEvent)
  .reset(submitted); //сброс при смене мода

//ИНН: 3664069397, ОГРН: 1053600591197,
export const validateOrganisationFormFx = createEffect<
  OrganisationFormType,
  boolean
>();
validateOrganisationFormFx.use(validateFxOranisationFullName);
validateOrganisationFormFx.map(validateFxOranisationShortName);
validateOrganisationFormFx.map(validateFxDateOrganisationReqire);

const sampleDone = sample({
  clock: organisationSubmit,
  source: $organisationForm,
  target: validateOrganisationFormFx,
});
//при валидации формы организации валидируется форма ИП
//todo добавить флаг проверки
const $isValid = createStore(false)
  .on(validateOrganisationFormFx.doneData, () => true)
  .reset(organisationSubmit);

$isValid.watch((val) => {
  if (val) {
    standartSubmit();
  }
});

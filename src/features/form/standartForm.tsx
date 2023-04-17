import {
  allSettled,
  combine,
  createEffect,
  createEvent,
  createStore,
  fork,
  forward,
  restore,
  sample,
  scopeBind,
} from "effector";
import { isValidINN, isValidOGRN } from "../validation";
import { changeFormModeEvent, submitted } from "./formMode";

export const standartSubmit = createEvent();
export type StandartFormType = {
  inn: string;
  innFile: File | null;
  ogrip: string;
  ogripFile: File | null;
  registerDate: string;
  egripFile: File | null;
  rentFile: File | null;
  isDoc: boolean;
};

//ИНН
export const changedInn = createEvent<string>();
export const validateFxInn = createEffect((form: StandartFormType) => {
  var isValid = isValidINN(form.inn);
  if (!isValid) {
    throw new Error("Неверный ИНН");
  }
  return true;
});

export const $errorInn = restore<Error>(validateFxInn.failData, null).reset(
  changedInn,
  submitted
);

//инн файл
export const changedInnFile = createEvent<File | null>();
export const validateFileInn = createEffect((form: StandartFormType) => {
  if (form.innFile === null) {
    throw new Error("Файл не загружен");
  }
  return true;
});
export const $errorInnFile = restore<Error>(
  validateFileInn.failData,
  null
).reset(changedInnFile);

//огрип
export const changedOgrip = createEvent<string>();
export const validateFxOgrip = createEffect((form: StandartFormType) => {
  var isValid = isValidOGRN(form.ogrip);
  if (!isValid) {
    throw new Error("Неверный ОГРИП");
  }
  return true;
});

export const $errorOgrip = restore<Error>(validateFxOgrip.failData, null).reset(
  changedOgrip,
  submitted
);

//файл огрип
export const changedOgripFile = createEvent<File | null>();
export const validateFileOgrip = createEffect((form: StandartFormType) => {
  if (form.ogripFile === null) {
    throw new Error("Файл не загружен");
  }
  return true;
});
export const $errorOgripFile = restore<Error>(
  validateFileOgrip.failData,
  null
).reset(changedOgripFile, submitted);

//дата регистрации
export const changedRegisterDate = createEvent<string>();
export const validateFxDateReqire = createEffect((form: StandartFormType) => {
  if (form.registerDate === "" || form.registerDate == null) {
    throw new Error("Введите значение");
  }
  return true;
});
export const $errorRegisterDate = restore<Error>(
  validateFxDateReqire.failData,
  null
).reset(changedRegisterDate, submitted);

//Скан выписки из егрип
export const changedEgripFile = createEvent<File | null>();
export const validateFileEgrip = createEffect((form: StandartFormType) => {
  if (form.egripFile === null) {
    throw new Error("Файл не загружен");
  }
  return true;
});
export const $errorEgripFile = restore<Error>(
  validateFileEgrip.failData,
  null
).reset(changedEgripFile, submitted);

//договор
type IsDocValidation = {
  file: File | null;
  isDoc: boolean;
};
export const changedRentFile = createEvent<File | null>();
export const validateFileRent = createEffect((form: StandartFormType) => {
  if (form.isDoc) {
    changedRentFile(null);
    return true;
  } else if (form.rentFile == null) {
    throw new Error("Загрузите файл");
  }
  return true;
});

export const $errorRentFile = restore<Error>(
  validateFileRent.failData,
  null
).reset(changedRentFile, submitted);

export const changedIsDoc = createEvent<boolean>();

//form

export const $standartForm = combine({
  inn: restore(changedInn, "").reset(submitted),
  innFile: restore(changedInnFile, null).reset(submitted),
  ogrip: restore(changedOgrip, "").reset(submitted),
  ogripFile: restore(changedOgripFile, null).reset(submitted),
  registerDate: restore(changedRegisterDate, "").reset(submitted),
  egripFile: restore(changedEgripFile, null).reset(submitted),
  rentFile: restore(changedRentFile, null).reset(submitted),
  isDoc: restore(changedIsDoc, false).reset(submitted),
})
  .reset(changeFormModeEvent)
  .reset(submitted); //сброс при смене мода;

//ИНН: 3664069397, ОГРН: 1053600591197,
export const validateStandartFormFx = createEffect<StandartFormType, boolean>();
validateStandartFormFx.use(validateFxInn);
validateStandartFormFx.map(validateFileInn);
validateStandartFormFx.map(validateFxOgrip);
validateStandartFormFx.map(validateFileOgrip);
validateStandartFormFx.map(validateFileRent);
validateStandartFormFx.map(validateFxDateReqire);
validateStandartFormFx.map(validateFileEgrip);
sample({
  clock: standartSubmit,
  source: $standartForm,
  target: validateStandartFormFx,
});
validateStandartFormFx.doneData.watch(() =>
  console.log($standartForm.getState())
);
validateStandartFormFx.failData.watch((e) => console.log(e.message));

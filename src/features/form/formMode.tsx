import { FormMode } from "@/Model";
import { createEvent, createStore } from "effector";

export const submitted = createEvent();

export const changeFormModeEvent = createEvent<FormMode>();

export const $formMode = createStore(FormMode.IP)
  .on(changeFormModeEvent, (_, mode) => mode)
  .reset(submitted);

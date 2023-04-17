import { InputSizeMode } from "@/Model";
import {
  $errorFull,
  $errorRegisterDateOrganisation,
  $errorShort,
  $organisationForm,
  changedOrganisationFullName,
  changedOrganisationShortName,
  changedRegisterDateOrganisation,
} from "@/features";
import {
  StyledDateInput,
  StyledForm,
  StyledFormColumn,
  StyledInput,
} from "@/widgets";
import { useStore } from "effector-react";

export const OrganisationForm = () => {
  //name
  const form = useStore($organisationForm);
  const fullError = useStore($errorFull);
  const FullNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedOrganisationFullName(e.target.value);
  };

  const shortError = useStore($errorShort);
  const ShortNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedOrganisationShortName(e.target.value);
  };

  //register date
  const dateError = useStore($errorRegisterDateOrganisation);
  const datepOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedRegisterDateOrganisation(e.target.value);
  };

  return (
    <StyledForm>
      <StyledFormColumn>
        <StyledInput
          size={InputSizeMode.big}
          value={form.organisationFullName}
          onChange={FullNameOnChange}
          placeHolder="ООО «Московская промышленная компания»"
          labelText="Наименование полное*"
          error={fullError?.message}
        />
        <StyledInput
          size={InputSizeMode.medium}
          value={form.organisationShortName}
          onChange={ShortNameOnChange}
          placeHolder="ООО «МПК»"
          labelText="Наименование сокращенное*"
          error={shortError?.message}
        />
        <StyledDateInput
          value={form.date}
          onChange={datepOnChange}
          placeHolder="дд.мм.гггг"
          labelText="Дата регистрации*"
          error={dateError?.message}
        />
      </StyledFormColumn>
    </StyledForm>
  );
};

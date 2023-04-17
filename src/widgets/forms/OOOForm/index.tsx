import { organisationSubmit } from "@/features";
import {
  OrganisationForm,
  StandartForm,
  StyledButton,
  StyledCard,
  StyledText,
} from "@/widgets";
import React from "react";

export const OOOForm = () => {
  return (
    <React.Fragment>
      <StyledCard>
        <StyledText>Общество с ограниченной ответственностью (ООО)</StyledText>
        <OrganisationForm />
        <StandartForm dateMode={false}></StandartForm>
      </StyledCard>
      <StyledButton onClick={() => organisationSubmit()}>Next</StyledButton>
    </React.Fragment>
  );
};

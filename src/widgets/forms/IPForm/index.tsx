import { standartSubmit } from "@/features";
import { StandartForm, StyledButton, StyledCard, StyledText } from "@/widgets";
import React from "react";

export const IPForm = () => {
  return (
    <React.Fragment>
      <StyledCard>
        <StyledText>Индивидуальный предприниматель (ИП)</StyledText>
        <StandartForm dateMode={true}></StandartForm>
      </StyledCard>
      <StyledButton onClick={() => standartSubmit()}>Next</StyledButton>
    </React.Fragment>
  );
};

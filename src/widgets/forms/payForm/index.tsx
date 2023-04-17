import { InputSizeMode } from "@/Model";
import {
  $errorBankName,
  $errorBik,
  $errorCheckingAccount,
  $errorCorrespondentAccount,
  $payForm,
  changedBankName,
  changedBik,
  changedCheckingAccount,
  changedCorrespondentAccount,
  sendData,
} from "@/features";
import {
  StyledButton,
  StyledCard,
  StyledForm,
  StyledFormColumn,
  StyledInput,
  StyledText,
} from "@/widgets";
import { useStore } from "effector-react";
import styled from "styled-components";
import React from "react";

const StyledBlueText = styled.label`
  height: 18px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #3e85fd;

  opacity: 0.87;
`;
const StyledPayFormContainer = styled.div`
  width: 60%;
`;
export const PayForm = () => {
  const form = useStore($payForm);

  const bikError = useStore($errorBik);
  const bikChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedBik(e.target.value);
  };

  //bank name
  const bankNameError = useStore($errorBankName);
  const bankNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedBankName(e.target.value);
  };

  //checkin account
  const checkingAccountError = useStore($errorCheckingAccount);
  const checkingAccountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedCheckingAccount(e.target.value);
  };
  //cooresp
  const correspAccountError = useStore($errorCorrespondentAccount);
  const correspAccountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    changedCorrespondentAccount(e.target.value);
  };
  return (
    <StyledPayFormContainer>
      <StyledCard>
        <StyledText>Банковские реквизиты</StyledText>
        <StyledForm>
          <StyledFormColumn>
            <StyledInput
              size={InputSizeMode.small}
              value={form.bik}
              onChange={bikChangedHandler}
              placeHolder="ххххххххх"
              labelText="БИК*"
              error={bikError?.message}
            />
            <StyledInput
              size={InputSizeMode.big}
              value={form.bankName}
              onChange={bankNameChanged}
              placeHolder="ООО «Московская промышленная компания»"
              labelText="Название филиала банка"
              error={bankNameError?.message}
            />
          </StyledFormColumn>
          <StyledFormColumn>
            <StyledInput
              size={InputSizeMode.medium}
              value={form.checkingAccount}
              onChange={checkingAccountChanged}
              placeHolder="хххххххххххххххххххх"
              labelText="Расчетный счет*"
              error={checkingAccountError?.message}
            />
            <StyledInput
              size={InputSizeMode.medium}
              value={form.correspondentAccount}
              onChange={correspAccountChanged}
              placeHolder="хххххххххххххххххххх"
              labelText="Корреспондентский счет*"
              error={correspAccountError?.message}
            />
          </StyledFormColumn>
        </StyledForm>
        {/* todo реализовать динамическое добавление */}
        <StyledBlueText>Добавить еще один банк</StyledBlueText>
      </StyledCard>
      <StyledButton onClick={() => sendData()}>Send data</StyledButton>
    </StyledPayFormContainer>
  );
};

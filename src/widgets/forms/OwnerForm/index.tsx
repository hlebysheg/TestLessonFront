import { FormMode, SelectModeValues } from "@/Model";
import { $formMode, $isPayFormOpen, changeFormModeEvent } from "@/features";
import { StyledLabel, StyledText } from "@/widgets";
import { useStore } from "effector-react";
import styled from "styled-components";

const StyledSelect = styled.select`
  background: #fbfbfb;
  border: 1px solid #e4e5e7;
  border-radius: 7px;
  width: 512px;
  height: 2.3rem;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;
const options = SelectModeValues.map((el) => (
  <option key={el.value} value={el.value}>
    {el.description}
  </option>
));

export const OwnerForm = () => {
  const formMode = useStore($formMode);
  const isPayMode = useStore($isPayFormOpen);
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeFormModeEvent(Number(event.target.value) as FormMode);
  };
  return (
    <StyledCard>
      <StyledText>Форма собственности</StyledText>
      <InputGroup>
        <StyledLabel>Вид деятельности*</StyledLabel>
        <StyledSelect
          disabled={isPayMode}
          id="selectedMode"
          value={formMode}
          onChange={onSelectChange}
        >
          {options}
        </StyledSelect>
      </InputGroup>
    </StyledCard>
  );
};

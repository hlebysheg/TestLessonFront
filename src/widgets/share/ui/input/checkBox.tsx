import styled from "styled-components";
import { StyledLabel } from "../text";
type InputProps = {
  value: boolean;
  onChange: () => void;
  labelText: string;
};
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding-top: 12px;
  gap: 8px;
`;
export const StyledCheckBox = ({ value, onChange, labelText }: InputProps) => {
  const StyledBox = styled.input`
    box-sizing: border-box;

    width: 18px;
    height: 18px;

    border: 1px solid #e4e5e7;
    border-radius: 4px;
  `;
  return (
    <StyledWrapper>
      <StyledBox type="checkbox" onChange={onChange} checked={value} />
      <StyledLabel>{labelText}</StyledLabel>
    </StyledWrapper>
  );
};

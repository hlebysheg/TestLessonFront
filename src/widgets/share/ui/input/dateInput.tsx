import { StyledLabel } from "@/widgets";
import styled from "styled-components";

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder: string;
    labelText: string;
    error?: string;
}
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;

    height: 81px;
`;

const StyledInputBar = styled.input`
    border: 1px solid #E4E5E7;
    height: 52px;
    border-radius: 7px;
    padding: 20px;
    width: 160px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    gap: 1rem;
    /* identical to box height */

    color: #222222;

    opacity: 0.6;
    :focus,
        select:focus,
        textarea:focus,
        button:focus {
            outline: none;
            border: 1px solid #E4E5E3;
    }
`;
export const StyledDateInput = ({value, onChange, placeHolder, labelText, error}: InputProps) => {
    return (
        <InputWrapper>
            <StyledLabel>{error ?? labelText}</StyledLabel>
            <StyledInputBar style={{borderColor: !!error?'red':'#E4E5E7'}} type="date" value={value} onChange={onChange} placeholder={placeHolder}/>
        </InputWrapper>
    )

}
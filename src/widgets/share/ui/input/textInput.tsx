import { InputSizeMode } from "@/Model";
import { StyledLabel } from "@/widgets";
import styled from "styled-components";

export type InputProps = {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder: string;
    labelText: string;
    size?: InputSizeMode;
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
    width: ${props => props.width + 'px'};
    border-radius: 7px;
    padding: 20px;
    :focus,
        select:focus,
        textarea:focus,
        button:focus {
            outline: none;
            border: 1px solid #E4E5E3;
    }
`;
export const StyledInput = ({value, onChange, placeHolder, labelText, size, error}: InputProps) => {

    const sizeWidth = new Map();
    sizeWidth.set(InputSizeMode.small, 160);
    sizeWidth.set(InputSizeMode.medium, 336);
    sizeWidth.set(InputSizeMode.big, 512);

    const width = sizeWidth.get(size ?? InputSizeMode.small);

    return (
        <InputWrapper>
            <StyledLabel>{error ?? labelText}</StyledLabel>
            <StyledInputBar style={{borderColor: !!error?'red':'#E4E5E7'}} width={width} value={value} onChange={onChange} placeholder={placeHolder}/>
        </InputWrapper>
    )

}
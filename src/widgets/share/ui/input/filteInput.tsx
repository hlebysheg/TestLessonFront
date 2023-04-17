import { CrossRed, StyledLabel, UploadIcons } from "@/widgets";
import { useRef, useState } from "react";
import styled from "styled-components";

type InputProps = {
  onChange: (e: File | null) => void;
  placeHolder?: string;
  labelText: string;
  error?: string;
};
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  height: 81px;
`;

const StyledInputBar = styled.input`
  border: 1px solid #e4e5e7;
  height: 52px;
  border-radius: 7px;
  padding: 20px;
  :focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
    border: 1px solid #e4e5e3;
  }
`;
export const DownloadLabel = styled.label`
  background-color: indigo;
  color: white;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const Rectangle = styled.div`
  width: 336px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e4e5e7;
  border-radius: 7px;
`;

const StyledButton = styled.button`
  width: 52px;
  height: 52px;

  border: 1px solid #5795fd;
  background: #5795fd;
  border-radius: 0px 7px 7px 0px;
`;

export const FileInput = ({ onChange, labelText, error }: InputProps) => {
  const actualBtnRef = useRef<HTMLInputElement>();
  const defaultTitle = "Выберите или перетащите файл";
  const [title, setTitle] = useState(defaultTitle);
  const [isFile, setIsFile] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    actualBtnRef?.current?.click();
  };
  const handleClickReset = (e: React.MouseEvent<HTMLElement>) => {
    setIsFile(false);
    setTitle(defaultTitle);
    onChange(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setTitle(e.target.files[0].name);
    setIsFile(true);
    const fileUploaded = e.target?.files[0];
    onChange(fileUploaded);
  };

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setTitle(e.dataTransfer.files[0].name);
      setIsFile(true);
      const fileUploaded = e.dataTransfer.files[0];
      onChange(fileUploaded);
    }
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const ResetButton = () => (
    <StyledLabel onClick={handleClickReset}>
      <CrossRed />
    </StyledLabel>
  );
  return (
    <InputWrapper>
      <StyledLabel>{error ?? labelText}</StyledLabel>
      <Rectangle
        onClick={() => handleClick}
        onDragOver={onDragOver}
        onDrop={handleDrop}
        style={{ borderColor: !!error ? "red" : "#E4E5E7" }}
      >
        <StyledLabel style={{ paddingLeft: "20px" }}>
          {title} {isFile && <ResetButton />}
        </StyledLabel>
        <StyledButton onClick={handleClick} type="button">
          <UploadIcons />
        </StyledButton>
      </Rectangle>
      <StyledInputBar
        ref={actualBtnRef}
        id={labelText}
        hidden
        type="file"
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

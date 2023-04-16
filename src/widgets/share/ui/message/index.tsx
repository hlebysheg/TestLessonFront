import styled from "styled-components";

export type MessageType = {
    visable: boolean;
    isError: boolean
}
const StyledAlert = styled.div`
    position: absolute;
    text-align:center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    height: 30px;
    padding: 10px;
    line-height: 1.8;
    border-radius: 5px;
    cursor: hand;
    cursor: pointer;
    font-family: sans-serif;
    font-weight: 400;
    background-color: #FDF7DF;
    border: 1px solid #FEEC6F;
    color: #C9971C;
`;

const StyledSucces = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    text-align:center;
    top: 0;
    bottom: 0;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    height: 30px;
    padding: 10px;
    line-height: 1.8;
    border-radius: 5px;
    cursor: hand;
    cursor: pointer;
    font-family: sans-serif;
    font-weight: 400;
    background-color: #EFE;
    border: 1px solid #DED;
    color: #9A9;
`;
export const Message = ({visable, isError}: MessageType) => {

    if(!visable){
        return <></>
    }
    if(isError){
        return<StyledAlert>ошибка отправки</StyledAlert>
    }

    return(<StyledSucces color="">сообщение отправлено</StyledSucces>)
}
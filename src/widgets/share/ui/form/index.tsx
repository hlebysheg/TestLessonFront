import styled from "styled-components";

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;

    /* height: 186px; */

`;
// transform: translateX(-150%);
// animation: ani 1s forwards;


// @keyframes ani {
// 0% {transform: translateX(-150%);}
// 100% {transform: translateY(0);}
// }

export const StyledFormColumn = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;

    height: 81px;
`;
export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;

    height: auto;
`;
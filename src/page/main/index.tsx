import { FormMode } from "@/Model";
import { $formMode, $isPayFormOpen, $messageMode } from "@/features";
import { IPForm, Message, OOOForm, OwnerForm } from "@/widgets"
import { PayForm } from "@/widgets/forms/payForm";
import { useStore } from "effector-react";
import React from "react"
import styled, { keyframes } from "styled-components";

const StyledAnimation = styled.div<{disp?: boolean}>`
    transform: translateX(-150%);
    animation: ani 1s forwards;
    @keyframes ani {
        0% {transform: translateX(-150%);}
        100% {transform: translateY(0);}
    }
`;
export const Main = () => {
    const formMode = useStore($formMode);
    const isPayMode = useStore($isPayFormOpen);
    const messageMode = useStore($messageMode);

    return (
        <React.Fragment>
            <Message visable={messageMode.visable} isError={messageMode.isError}/>
            <OwnerForm/>
            <StyledAnimation hidden={isPayMode || (formMode !== FormMode.IP)}><IPForm/></StyledAnimation>
            <StyledAnimation hidden={isPayMode || (formMode !== FormMode.OOO)}> <OOOForm/></StyledAnimation>
            <StyledAnimation hidden={!isPayMode}>{isPayMode && <PayForm/>}</StyledAnimation>
        </React.Fragment>
    )
}
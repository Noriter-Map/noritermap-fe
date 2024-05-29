import React from 'react';
import { Body, H4, Container, Dot, Step1, Step2, Step3 } from './LoadingAnimation.style';

export const LoadingAnimation = () => {
    return (
        <Body>
            <Container id="container">
                <Dot id="dot" />
                <Step1 id="s1" className="step" />
                <Step2 id="s2" className="step" />
                <Step3 id="s3" className="step" />
            </Container>
            <H4>현재 위치정보를 불러오고 있습니다...</H4>
        </Body>
    );
};


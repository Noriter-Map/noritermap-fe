import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const dotAnimation = keyframes`
  0% { transform: scale(1, .7); }
  20% { transform: scale(.7, 1.2); }
  40% { transform: scale(1, 1); }
  50% { bottom: 100px; }
  46% { transform: scale(1, 1); }
  80% { transform: scale(.7, 1.2); }
  90% { transform: scale(.7, 1.2); }
  100% { transform: scale(1, .7); }
`;

const stepAnimation = keyframes`
  0% { 
    opacity: 0;
    top: 0;
    right: 0;
  }
  50% { opacity: 1; }
  100% { 
    top: 90px; 
    right: 90px;
    opacity: 0;
  }
`;

// Styled components
export const Body = styled.div`
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  margin-top: 161px;
  text-align: center;
`;

export const H4 = styled.h4`
  position: relative;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-weight: 700;
  font-family: "Pretendard Variable", Pretendard, Arial, sans-serif;
  color: #000;
  font-size: 21px;
  letter-spacing: 1px;
`;

export const Container = styled.div`
  margin: -45px -60px;
  width: 120px;
  height: 90px;
  position: absolute;
  top: 40%;
  left: 50%;
`;

export const Dot = styled.div`
  background: #353B7F;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 30px;
  left: 27px;
  transform-origin: center bottom;
  animation: ${dotAnimation} .4s ease-in-out infinite;
`;

export const Step = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-top: 6px solid #353B7F;
  top: 0;
  right: 0;
  animation: ${stepAnimation} 1.2s linear infinite;
`;

export const Step1 = styled(Step)`
  animation-delay: 0s;
`;

export const Step2 = styled(Step)`
  animation-delay: -.4s;
`;

export const Step3 = styled(Step)`
  animation-delay: -0.8s;
`;


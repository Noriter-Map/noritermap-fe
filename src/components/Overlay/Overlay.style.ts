import styled from 'styled-components';

export const CustomOverlayContainer = styled.div`
  position: relative;
  top: -120px; 
`;

export const CustomOverlay = styled.div`
  width: 250px;
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  position: relative;
  cursor: pointer;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Rating = styled.div`
  font-size: 14px;
  color: #ff6e00;
  margin-bottom: 10px;
`;

export const RatingValue = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export const Stars = styled.span`
  color: #ff6e00;
  margin-right: 5px;
`;

export const ReviewCount = styled.span`
  color: #666;
`;

export const Address = styled.div`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
`;

export const PhoneNumber = styled.div`
  font-size: 14px;
  color: #008000;
  margin-bottom: 10px;
`;

export const Details = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;

  a {
    color: #00aaff;
    text-decoration: none;
  }
`;


export const HiddenId = styled.div`
  display: none;
`;

import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom: 50px;
`;

export const StyledTitleWrapper = styled.div`
  width: 100%;
  height: fit-content;
  border-bottom: 0.2px solid #d9d9d9;
`;

export const StyledTitle = styled.div`
  margin-left: 20px;
  margin-right: 28px;
  margin-top: 20px;
  padding-bottom: 20px;
  width: 439px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledAddrText = styled.div`
  font-size: 14px;
  color: #000000;
  font-weight: 400;
`;

export const StyledFcNmText = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #101010;
`;

export const StyledDetailInfoContainer = styled.div`
  width: 100%;
  height: fit-content;
  border-bottom: 0.2px solid #d9d9d9;
`;

export const StyledIconText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 170px;
`;

export const StyledIconTextPlay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: fit-content;
`;

export const StyledIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const StyledDetailTitleText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
`;

export const StyledDetailContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const StyledDetailTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledContentText = styled.div`
  font-size: 18px;
  color: #000000;
  font-weight: 500;
`;

export const StyledTable = styled.table`
  width: 400px;
  border-collapse: collapse;
  text-align: center;
`;

export const StyledTableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const StyledTableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  font-weight: normal;
  color: #888;
  width: 50%;
`;

export const StyledTableBody = styled.tbody`
  background-color: #fff;
`;

export const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const StyledTableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  width: 50%;
`;

export const StyledUpdateIcon = styled.button`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: fit-content;
  background-color: transparent;
  border: none;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
  margin-top: 20px;
`;

export const StyledPenIcon = styled.img`
  width: 24px;
  height: 24px;
  color: #2d69af;
`;

export const StyledUpdateText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #2d69af;
  cursor: pointer;
`;

export const StyledLoadingContainer = styled.div`
  text-align: center;
  margin-top: 100px;
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px;
`;
export const Header = styled.header`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px;
  display: flex;
  vertical-align: baseline;
  justify-content: space-between;
`;
export const HeaderTitleWrapper = styled.div`
  margin-left: 50px;
  box-sizing: border-box;
  display: flex;
  gap: 4px;
  align-items: baseline;
`;

export const HeaderTitleMain = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 4rem;
  line-height: 79px;
`;
export const HeaderTitleSub = styled.h2`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 3rem;
  line-height: 59px;
  color: rgba(255, 99, 155, 0.42);
  text-shadow: 0px 4px 12px rgba(255, 99, 155, 0.42);
`;

export const HeaderButton = styled.a`
  box-sizing: border-box;
  font-size: 1.5rem;
  padding: 1px 4px;

  background: lightgray;
`;
export const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

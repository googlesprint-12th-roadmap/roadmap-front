import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 50px 0px;
  font-family: 'Inter';
  font-style: normal;
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px;
`;
export const Header = styled.header`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
`;
export const HeaderTitleWrapper = styled.div`
  width: 700px;

  box-sizing: border-box;
  display: flex;
  gap: 4px;
  align-items: baseline;
  border-bottom: 1.5px solid #000000;
`;

export const HeaderTitleMain = styled.h1`
  font-weight: 700;
  font-size: 4rem;
  line-height: 79px;
`;
export const HeaderTitleSub = styled.h2`
  font-weight: 700;
  padding: 1px 4px;
  font-size: 3rem;
  line-height: 59px;
  color: rgba(255, 99, 155, 0.42);
  text-shadow: 0px 4px 12px rgba(255, 99, 155, 0.42);
`;

export const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderLinkWrapper = styled.div`
  margin-top: 9px;
`;

export const HeaderLink = styled.a`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #ffa4c5;
  &:link {
    color: #ffa4c5;
  }
  border-bottom: 1px solid #ffa4c5;
`;

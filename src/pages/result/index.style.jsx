import styled from 'styled-components';
import Button from '../../components/Button';

export const Wrapper = styled.div`
  min-width: 600px;
  margin: 50px 0px;
  font-family: 'Inter';
  font-style: normal;
  box-sizing: border-box;
  width: 100%;
  padding: 16px 16px;
`;
export const Header = styled.header`
  box-sizing: border-box;
  max-width: 700px;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
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
  & + &::before {
    margin-left: 13px;
  }
`;

export const BackToEditButton = styled.button`
  padding: 5px 15px 5px 15px;
  margin-left: 5px;
  margin-right: 5px;
  border: none;
  border-radius: 10px;
  width: 150px;
  align-self: flex-end;
  right: 0px;
  bottom: 50px;
  position: absolute;
  font-size: 16px;
  font-weight: 600;

  background-color: #ffa4c5;
  :hover {
    background-color: #ff639b;
  }
  color: white;
  cursor: pointer;
`;

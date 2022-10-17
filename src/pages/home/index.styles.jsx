// styled-components 컴포넌트 모음
import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: rgb(255, 99, 155, 0.42);
  justify-content: center;
  align-items: center;
  height: 800px;

  button {
    border: 0;
    margin: 0 auto;
    padding: 0;
    width: 120px;
    height: 35px;
    cursor: pointer;
    color: white;
    font-weight: 700;
    font-size: 1.2em;
    background-color: rgb(255, 99, 155, 0.42);
    border-radius: 999px;
    box-shadow: rgba(255, 99, 155, 0.1) 0px 10px 15px -3px,
      rgba(255, 99, 155, 0.2) 0px 4px 6px -2px;
  }

  button:hover {
    background-color: rgb(255, 99, 155, 0.8);
  }
`;

export const SubTitle = styled.p`
  font-size: 0.9em;
  margin-bottom: 3em;
`;

export const Title = styled.p`
  margin-bottom: 1em;

  span {
    font-size: 3em;
    font-weight: 700;
    text-shadow: 1px 1px 5px rgb(255, 99, 155, 0.4);
  }
`;

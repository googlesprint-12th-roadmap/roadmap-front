import styled from 'styled-components';

// 컴포넌트 공통 스타일
export const AddNodeWrap = styled.div`
  margin-top: 4rem;
  height: 4rem;

  padding-left: 1rem;
`;

export const AddNodeForm = styled.div`
  display: flex;
  height: 100%;

  form {
    height: 100%;
    display: flex;
    align-items: center;
  }

  input[type='text'] {
    border: 0;
    outline: 1px dashed #ccc;
    border-radius: 8px;
    margin-right: 2px;
    height: 100%;
    font-size: 2rem;
    line-height: 2.4rem;
  }
  button {
    border: 0;
    color: white;
    background: #ffa4c5;
    border-radius: 8px;
    margin: 0 0 0 3px;
    padding: 3px 10px;
    cursor: pointer;
    :hover {
      background-color: #ff639b;
    }
    height: 100%;
  }
`;

export const AddNodeButton = styled.div`
  cursor: pointer;
  border: 1px dashed #ccc;
  border-radius: 8px;
  padding: 3px;
  color: #ccc;
  height: 100%;
  display: flex;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    width: 1.9rem;
    height: 1.9rem;
    background-image: url('/images/plusIcon.png');
    margin-right: 0.5rem;
    margin-left: 1rem;
  }

  p {
    font-size: 2rem;
    line-height: 2.4rem;

    color: #999999;
  }
`;

import styled from "styled-components"

export const Title = styled.p`
    margin-bottom: 1em;

    span {
        font-size: 2em;
        font-weight: 700;
        color: rgb(255, 99, 155, 0.42);
        text-shadow: 1px 1px 5px rgb(255, 99, 155, 0.4);
    }
`

export const Container = styled.section`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;

  div {
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }


  form {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 0 auto;
  }

  input {
    border: 0;
    padding: 10px;
    border-bottom: 1px solid #FF639B;
    outline: unset;
  }
  
  input[type="password"] {
    margin-bottom: 20px;
  }

  input[type="submit"] {
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

  input[type="submit"]:hover{
    background-color: rgb(255, 99, 155, 0.8);
  }
`

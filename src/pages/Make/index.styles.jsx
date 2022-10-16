import styled from "styled-components";

export const AddNodeContainer = styled.div`
    width: 300px;
    padding: 10px;
`

export const NodeList = styled.ul`
    li {
        padding: 5px;
        display: flex;
        align-items: center;
    }

    span:last-child {
        color: white;
    }

    img {
        margin: 3px;
    }

    li:hover {
        background-color: #EFEFEF;
    }
`
export const AddNodeForm = styled.div`
    display: flex;
    input[type=text] {
        border: 0;
        outline: 1px dashed #ccc;
        border-radius: 8px;
        margin-right: 2px;
    }
    button {
        border: 0;
        color: white;
        background: #FFA4C5;
        border-radius: 8px;
        margin: 0 0 0 3px;
        padding: 3px 10px;
        cursor: pointer;
    }
    button: hover {
        background-color: #FF639B;
    }
`

export const AddNodeButton = styled.div`
    cursor: pointer;
    border: 1px dashed #ccc;
    border-radius: 8px;
    padding: 3px;
    color: #ccc;
`
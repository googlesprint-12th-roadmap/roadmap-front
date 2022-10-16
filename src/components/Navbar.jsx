import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <>
    <Container>
        <div>
            <Link to="/">
                <Icon>
                    Roady
                </Icon>
            </Link>
            <Nav>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </Nav>
        </div>
    </Container>
    <Border/>
    </>
  )
};

export default Navbar;

const Border = styled.div`
    background-color: rgb(255, 99, 155, 0.42);
    height: 2px;
`

const Container = styled.header`
    width: 100%;
    padding: 10px;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }

    a {
        text-decoration: none;
    }
`

const Icon = styled.span`
    margin-bottom: 0;
    margin-right: auto;
    font-size: 1.2em;
    font-weight: 700;
    color: rgb(255, 99, 155, 0.42);
    text-shadow: 1px 1px 5px rgb(255, 99, 155, 0.4);
`

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: auto;

    a {
        margin-right: 20px;
        color: black;
    }
    
    
`
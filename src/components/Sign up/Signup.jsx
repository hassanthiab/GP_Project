import styled from 'styled-components';
import React from 'react';
import '../Login/LoginStyle.css';
import FancyInput from "../Login/Input"
import FancyButton from "../Login/Button"

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 30vw;
    background: #1312128f;
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.3);
    backdrop-filter: blur(2.5px);
    border-radius:15px ;
    color: #ffffff;
    text-transform: uppercase ;
    letter-spacing: 0.5em;

    @media screen and (max-width: 320px) {
        width: 90% ;
        height: 90% ;
    }

    @media screen and (max-width: 360px) {
        width: 90% ;
        height: 90% ;

    }
     @media screen and (max-width: 411px) {
        width: 90% ;
        height: 90% ;

    }
    @media screen and (max-width: 768px) {
        width: 90% ;
        height: 90% ;

    }
     @media screen and (max-width: 1024px) {
        width: 90% ;
        height: 90% ;

    }
    @media screen and (max-width: 1280px) {
        width: 90% ;
        height: 90% ;

    }
    
    

`;

const Title = styled.h2`
margin: 3rem 0 2rem 0 ;

`;



const InputText = styled.div`
margin: 4rem 0 1rem 0 ;
display:flex ;
flex-direction:column ;
justify-content: space-around;
align-items: center ;
height: 20% ;
width: 100% ;
`;

const Buttons = styled.div`
    display:flex ;
    flex-direction:column ;
    height: 20% ;
    justify-content: space-around;
    align-items: center ;
    margin: 2rem 0 2rem 0 ;
    width:100% ;
`;
function Signup()
{
    
    return (
        <body class="Login">
    <Container>   
            <Title>welcome</Title>
            <InputText>
            <FancyInput type="text" placeholder='Email'></FancyInput>
            
            <FancyInput type="password" placeholder='Password'></FancyInput>
            <FancyInput type="password" placeholder='Confirm Password'></FancyInput>
            <FancyInput type="number" placeholder='Phone Number'></FancyInput>
            </InputText>
            <Buttons>
                <FancyButton nameButton='Sign up'></FancyButton>
            </Buttons>
            
        </Container>
        </body>
    
         );
}

export default Signup;
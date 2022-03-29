import React from 'react'
import styled from 'styled-components';
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: ${props=> props.width};
    background: #1312128f;
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.3);
    backdrop-filter: blur(2.5px);
    border-radius:15px ;
    color: #ffffff;
    @media screen and (max-width: 320px) {
        width: 90% ;
       
    }

    @media screen and (max-width: 360px) {
        width: 90% ;
       

    }
     @media screen and (max-width: 411px) {
        width: 90% ;
        

    }
    @media screen and (max-width: 768px) {
        width: 90% ;
       

    }
     @media screen and (max-width: 1024px) {
        width: 90% ;
    

    }
    @media screen and (max-width: 1280px) {
        width: 90% ;
     
    }

`;

function ContainerBox(props) {
  return (
   <Container style={{height:props.size}}></Container>
  )
}

export default Container

import styled from "styled-components";
import {NavLink as Link} from 'react-router-dom';

export const Nav = styled.nav`
    display: flex ;
    justify-content: space-between ;
    background-color: #101522 ;
    z-index: 10 ;

    height: 80px ;
`;
export const BarsDiv = styled.div`
display: none;
color: white;

@media screen and (max-width: 960px){
    display:flex;
    position: absolute ;
    top: 6;
    right:0;
    transform: translate(-100%,60%) ;
    font-size: 2.5rem;
    cursor: pointer ;

}
    
`;
export const NavItem = styled.li`
display: ${({button}) => (button ? "flex" : "none")};
height: 80px;
width: 100%;
border-bottom: 3 px solid transparent;


`;


export const NavLink = styled(Link)`
font-size: 22px;
color: white;

display: flex;
align-items: center ;
text-decoration: none ;
padding    : 2rem ;

height: 100% ;  
cursor: pointer ;
&:hover
{
    transition: all 0.2s ease-in-out ;
    color:#2196f3;
}
&.active
{
    transition: all 0.2s ease-in-out ;
    border-bottom: 4px solid #2196f3;
    color:#2196f3;
    outline: none ;
     
}
@media screen and (max-width: 960px){
        display: table;
        flex-direction: column;
        width: 100% ;
        padding: 2rem
}
`;

export const NavMenu = styled.ul`
    display:flex;
    align-items:center ;
    list-style: none ;
    text-align: center ;
    z-index: 10 ;
    @media screen and (max-width: 960px){
        display: flex;
        flex-direction: column;
        width: 100% ;
        height: 90vh;
        position: absolute ;
        top: 80 px;
        left: ${({click}) => (click ? 0 : "-100%")};
        transition: all 0.4s ease-in ;
        background-color: #101522 ;
    }
`

export const NavBtn = styled.nav`
    display:flex;
    align-items: center;
    margin-right: 3px ;
`

export const NavBtnLink = styled(Link)`

    font-size: 17px;
    margin-right: 2rem ;
    background-color: #2196f3 ;
    color: #fff;
    padding: 10px 22px;
    border-radius: 2rem;
    outline:none;
    cursor:pointer;
    transition: all 0.2s ease-in-out ;
    text-decoration: none ;
    text-transform: uppercase ;

    &:hover
    {
        transition: all 0.2s ease-in-out ;
        background: #fff;
        color: #010606;

    }
    @media screen and (max-width: 960px){
        display: none;
}
`



import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import styled from 'styled-components';
export default function(props)
{
    return (
        <div class="container">
<div class="row">

<div class="col-md-1">

</div>

<div class="col-md-10">
    {/* <button type="button" style={{ width:"100%"}} class="btn btn-outline-primary">{nameButton}</button>  */}
    <StyledButton onClick={props.onClick}>{props.nameButton}</StyledButton>
    </div>

    <div class="col-md-1">

</div>

    </div>

    </div>
    )
    {/* <StyledButton>{nameButton}</StyledButton>; */}
   

}

const StyledButton = styled.button`

background: #2196f3;
text-transform: uppercase ;
letter-spacing: 0.15rem;
box-shadow: 0 8px 32px 0 rgba (31,38,135, 0.37);
border-radius: 2rem;
width: 100%;
height: 3rem;
padding: 1rem;
border:none;
color:white;
outline:none;
cursor: pointer;
margin-top: 20px;
margin-bottom: 10px;
&:hover
    {
        transition: all 0.2s ease-in-out ;
        background: #fff;
        color: #010606;

    }
`;
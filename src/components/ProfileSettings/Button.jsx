import React from 'react'
import { Button } from '@material-ui/core'


let ButtonP=(props)=>{
  return(
<Button onClick={props.onClick} style={{ marginLeft:'50px',  maxWidth: '110px', maxHeight: '40px', minWidth: '110px', minHeight: '40px'}}  variant='contained'>
{props.placeholder}
</Button>)
}

export default ButtonP

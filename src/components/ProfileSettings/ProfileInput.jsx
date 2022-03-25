import React from 'react'
import FancyInput from "../Login/Input"
import { Button } from '@material-ui/core'
function ProfileInput(props) {
  return (
    <React.Fragment>
        <div class="container justify-content-md-center">
            
            <FancyInput input_label={props.input_label} type={props.type} placeholder={props.placeholder}></FancyInput>
            <div class=" container row">
                <div class="col-8">

                </div>
                <div class="col-1">
                <Button style={{ marginLeft:'50px',  maxWidth: '110px', maxHeight: '40px', minWidth: '110px', minHeight: '40px'}}  variant='contained'>
                    {props.placeholder}
                </Button>
                </div>
            </div>
     
        </div>
 
    </React.Fragment>
  )
}

export default ProfileInput

import React from 'react'
import FancyInput from "../Login/Input"


let InputP=(props)=>{
  return(
<FancyInput onChange={props.onChange} bordercolor={props.bordercolor} input_label={props.input_label} type={props.type} placeholder={props.placeholder} value={props.value}></FancyInput>)
}
export default InputP
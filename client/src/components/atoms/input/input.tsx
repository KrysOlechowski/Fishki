import { FC,  } from 'react';
import styled from "styled-components/macro";



interface Props {
   name:string;
   value:string;
   onChange:any;
   type:string;
   placeholder:string;
   className?:string;
}



export const Input: FC<Props> = ({name,value,onChange,type,placeholder,className}) => {
  

   return (
      <Container name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} className={className}>

      </Container>
   )
};

const Container=styled.input`
   border:1px solid red;
   padding: 5px;
    border-radius: 10px;
    border-color: #3f3f3f;
    margin: 5px 0;
    outline: none;
`

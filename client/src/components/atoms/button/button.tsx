import clsx from 'clsx';
import { FC, useCallback, } from 'react';
import styled from "styled-components/macro";
import { lighten } from 'polished'

interface Props {
   className?: string;
   name?: string;
   onClick?: (e: React.MouseEvent<HTMLElement>) => void;
   bgColor?: string;
   children: string;
   type?:"button" | "submit" | "reset" | undefined;
}



export const Button: FC<Props> = ({ onClick, className, name, bgColor, children ,type}) => {

   const onButtonClick = useCallback(
      (e) => {
         onClick && onClick(e)
      },
      [onClick],
   )

   return (
      <ButtonWrapper bgColor={bgColor} name={name} onClick={onButtonClick} className={clsx("button", className)} type={type}>
         {children}
      </ButtonWrapper>
   )
};

interface ButtonProps {
   bgColor?: string;
}

const ButtonWrapper = styled.button<ButtonProps>`
   width:100%;
   padding:5px 10px;
   border-radius:10px;
   outline:none;
   background-color:${props => props.bgColor ? props.bgColor : "#3F3F3F"};
   color:white;

     &:hover, &:focus {
        cursor: pointer;
        background-color:${props => props.bgColor ? lighten('0.1', props.bgColor) : lighten('0.1', "#3F3F3F")};
  }
`

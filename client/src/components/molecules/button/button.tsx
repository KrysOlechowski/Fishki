import clsx from 'clsx';
import { FC, useCallback, } from 'react';
import styled from "styled-components/macro";


interface Props {
   label: string;
   className?: string;
   onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}



export const Button: FC<Props> = ({ onClick, className, label }) => {

   const onButtonClick = useCallback(
      (e) => {
         onClick && onClick(e)
      },
      [onClick],
   )

   return (
      <ButtonWrapper onClick={onButtonClick} className={clsx("button", className)}>
         {label}
      </ButtonWrapper>
   )
};

const ButtonWrapper = styled.button`
   border:1px solid red;
`

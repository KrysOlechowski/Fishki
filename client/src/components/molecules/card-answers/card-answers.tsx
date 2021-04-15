import clsx from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';
import styled from "styled-components/macro";



interface Props {
}



export const CardAnswers: FC<Props> = () => {

   const handleSubmit = useCallback(
      (e) => {
         console.log(e)
      },
      [],
   )

   return (
      <Wrapper className={clsx("wrapper")}>
         <form onSubmit={handleSubmit}>
            <button type="submit" >Good</button>
            <button type="submit">Bad</button>
         </form>

      </Wrapper>
   )
};

const Wrapper = styled.div`

`

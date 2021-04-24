import clsx from 'clsx';
import { FC, useCallback, useState } from 'react';
import styled from "styled-components/macro";

import { EditIcon } from '../../../assets/icons'


interface Props {
   onClick: () => void;
}

export const EditButton: FC<Props> = ({ onClick }) => {
   const [editMode, setEditMode] = useState(false)

   const onEditClick = useCallback(
      () => {
         setEditMode(!editMode)
         onClick()
      },
      [editMode, onClick],
   )

   return (
      <EditIconWrapper>
         <EditIcon className={clsx("iconWrapper", { editMode: editMode })} onClick={onEditClick} />
      </EditIconWrapper>
   )
};

const EditIconWrapper = styled.div`
   
      svg{
         width:22px;
      }

      &:hover{
         cursor: pointer;
      }
`

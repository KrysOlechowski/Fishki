import clsx from 'clsx'
import { FC, useState } from 'react';
import { Button, Wrapper as DropdownWrapper, Menu, MenuItem } from 'react-aria-menubutton';

import styled from "styled-components/macro";

import '../../theme/variables.scss'
import { ArrowDownIcon } from '../../assets/icons'

interface Props {
   options: { label: string }[]
   onClick?: any;
}



export const Dropdown: FC<Props> = ({ options, onClick }) => {
   const [isOpen, setIsOpen] = useState(false);

   const onMenuToggle = (e: { isOpen: boolean | ((prevState: boolean) => boolean); }) => {
      setIsOpen(e.isOpen);
   };

   const handleSelection = () => {
      console.log("handle selection")
   }

   return (
      <Wrapper className="wrapper">
         <DropdownWrapper
            className="dropdown"
            onSelection={handleSelection}
            onMenuToggle={onMenuToggle}
         >
            <Button className="dropdown-title">
               <div>{"placeholder"}</div>
               <div>
                  <ArrowDownIcon className={clsx('dropdown-arrow', { 'rotate': isOpen })} />
               </div>
            </Button>
            <Menu className="dropdown-menu-wrapper">
               <ul className="dropdown-menu">
                  {options.map((opt, i) => {
                     return (
                        <MenuItem
                           value={opt.label}
                           className='dropdown-menu-item'
                           key={i}
                        >
                           <li className="menu-item-wrapper">
                              <div className="menu-item-inner">
                                 <div> {opt.label} </div>

                              </div>
                           </li>
                        </MenuItem>
                     );
                  })}
               </ul>
            </Menu>
         </DropdownWrapper>
      </Wrapper>
   )
};

const Wrapper = styled.div`

.dropdown{
   border: 1px solid var(--mercury);
    text-align-last: left;
    background-color: transparent;
    border-radius: 0;
    position: relative;
}

.dropdown-title{
   outline:none;
   position: relative;
    display: flex;
    border: 1px solid var(--mercury);
    padding: 15px 20px 15px 15px;
    color: var(--abbey);
    max-width: 260px;
}

.dropdown-arrow{
   position: absolute;
    width: 1.8em;
    pointer-events: none;
    right: 5px;
    top: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(-90deg);
    transition: all 0.3s ease;

    &.rotate{
      transform: translateY(-50%) translateX(-50%) rotate(0);
    }
}

.dropdown-menu-wrapper{
   outline: none;
    position: absolute;
    background-color: white;
    z-index: 999999;
    width: 100%;
    max-width: 260px;
    border-left: 1px solid var(--mercury);
    border-right: 1px solid var(--mercury);
    border-bottom: 1px solid var(--mercury);
    box-sizing: border-box;

    .dropdown-menu{
      list-style-type: none;
      margin: 0;
      padding: 0;

    .dropdown-menu-item{
      outline: none;

      &:hover{
         background-color: var(--gallery);
      }

      .menu-item-wrapper{
         padding: 10px 15px;
         color: inherit;
      }
    }
    }
}
`

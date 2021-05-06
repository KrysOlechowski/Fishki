import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import {
  Button,
  Wrapper as DropdownWrapper,
  Menu,
  MenuItem,
} from "react-aria-menubutton";

import styled from "styled-components/macro";

import { ArrowDownIcon } from "../../../assets/icons";
import "../../../theme/variables.scss";
interface Props {
  options: { label: string }[];
  onSelection: (value: string) => void;
  className?: string;
}

export const Dropdown: FC<Props> = ({ options, onSelection, className }) => {
  const [value, setValue] = useState(options[0].label);
  const [isOpen, setIsOpen] = useState(false);

  const onMenuToggle = (e: {
    isOpen: boolean | ((prevState: boolean) => boolean);
  }) => {
    setIsOpen(e.isOpen);
  };

  const handleSelection = useCallback(
    (e) => {
      setValue(e);
      onSelection(e);
    },
    [onSelection]
  );

  return (
    <Container className={clsx("wrapper", className)}>
      <DropdownWrapper
        className="dropdown"
        onSelection={handleSelection}
        onMenuToggle={onMenuToggle}
      >
        <Button className="dropdown-title">
          <div>{value}</div>
          <div>
            <ArrowDownIcon
              className={clsx("dropdown-arrow", { rotate: isOpen })}
            />
          </div>
        </Button>
        <Menu className="dropdown-menu-wrapper">
          <ul className="dropdown-menu">
            {options.map((opt, i) => {
              return (
                <MenuItem
                  value={opt.label}
                  className="dropdown-menu-item"
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
    </Container>
  );
};

const Container = styled.div`
  .dropdown {
    border: 1px solid #3f3f3f;
    text-align-last: left;
    background-color: white;
    border-radius: 10px;
    border-width: 2px;
    position: relative;
  }

  .dropdown-title {
    outline: none;
    position: relative;
    display: flex;
    padding: 5px;
    color: var(--abbey);
    max-width: 260px;
  }

  .dropdown-arrow {
    position: absolute;
    width: 1.8em;
    pointer-events: none;
    right: 5px;
    top: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(-90deg);
    transition: all 0.3s ease;

    &.rotate {
      transform: translateY(-50%) translateX(-50%) rotate(0);
    }
  }

  .dropdown-menu-wrapper {
    outline: none;
    position: absolute;
    z-index: 999999;
    width: 100%;
    max-width: 260px;
    box-sizing: border-box;

    .dropdown-menu {
      list-style-type: none;
      margin: 0;
      padding: 0;

      .dropdown-menu-item {
        color: var(--abbey);
        outline: none;
        border: 1px solid #3f3f3f;
        border-width: 2px;
        border-radius: 10px;
        background: white;

        &:hover {
          background-color: var(--gallery);
          cursor: pointer;
        }

        .menu-item-wrapper {
          padding: 10px 15px;
          color: inherit;
        }
      }
    }
  }
`;

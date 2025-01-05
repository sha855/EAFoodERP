import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ReactNode } from 'react';

const ITEM_HEIGHT = 48;

interface CommonMenuProps {
  options: { [key: string]: string } | string[];
  defaultSelected?: string;
  onSelect?: (key: string, value?: string) => void;
  children: ReactNode;
}

const CommonSelectMenu: React.FC<CommonMenuProps> = ({
  options,
  defaultSelected,
  onSelect,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (key: string, value?: string) => {
    if (onSelect) {
      onSelect(key, value);
    }
    handleClose();
  };

  const renderOptions = () => {
    if (Array.isArray(options)) {
      return options.map((option, index) => (
        <MenuItem
          key={index}
          selected={defaultSelected === option}
          onClick={() => handleMenuItemClick(option)}
        >
          {option}
        </MenuItem>
      ));
    }

    return Object.entries(options).map(([key, value], index) => (
      <MenuItem
        key={index}
        selected={defaultSelected === key}
        onClick={() => handleMenuItemClick(key, value)}
      >
        {value}
      </MenuItem>
    ));
  };

  return (
    <div>
      <div
        aria-label="more"
        id="common-menu-button"
        aria-controls={open ? 'common-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {children}
      </div>
      <Menu
        id="common-menu"
        MenuListProps={{
          'aria-labelledby': 'common-menu-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {renderOptions()}
      </Menu>
    </div>
  );
};

export default CommonSelectMenu;

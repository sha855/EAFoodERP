import React, { ReactElement, ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import clsx from 'clsx';

interface CommonToolTipProps {
  title: string | ReactNode;
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end';
  children?: ReactElement;
  arrow?: boolean;
  className?: string;
  classTooltip?: string;

  [key: string]: any;
}

export default function CommonToolTip({
  title,
  placement = 'top',
  arrow = true,
  children,
  className,
  classTooltip = 'w-6 h-6',
  ...args
}: CommonToolTipProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Tooltip
      className={clsx(className, '')}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title={title}
      placement={placement}
      arrow={arrow}
      slotProps={{
        tooltip: {
          style: {
            backgroundColor: '#000',
            color: '#ffffff',
            fontSize: '13px',
            textAlign: 'center',
          },
        },
        arrow: {
          style: {
            color: '#000',
          },
        },
      }}
      {...args}
    >
      {!children ? (
        <div className="max-w-fit">
          <IoIosInformationCircleOutline className={`${classTooltip}`} />
        </div>
      ) : (
        children
      )}
    </Tooltip>
  );
}

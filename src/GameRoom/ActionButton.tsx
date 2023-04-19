import React, {ReactNode} from 'react';
interface Props {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;

  }
const ActionButton = ({ children, onClick, className, disabled = false }: Props) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;

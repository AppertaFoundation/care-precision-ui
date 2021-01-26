import React from 'react';

const ClickableElement: React.FC<{
  children: JSX.Element;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
}> = ({ children, onClick }) =>
  onClick ? (
    <div onClick={onClick} onKeyPress={onClick} role="button" tabIndex={0}>
      {children}
    </div>
  ) : (
    children
  );
export { ClickableElement };

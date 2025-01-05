import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Container;

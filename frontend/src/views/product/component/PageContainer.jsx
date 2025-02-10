import React from 'react';

const PageContainer = ({ title, description, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default PageContainer;
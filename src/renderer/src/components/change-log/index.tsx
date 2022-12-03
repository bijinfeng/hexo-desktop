import React from 'react';

interface ChangeLogProps {
  html: string;
}

const ChangeLog: React.FC<ChangeLogProps> = ({ html }) => {
  return <article className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ChangeLog;

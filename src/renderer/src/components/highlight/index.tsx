import React from 'react';

interface Highlight {
  text: string;
  keyword?: string;
}

const Highlight: React.FC<Highlight> = ({ text, keyword }) => {
  if (!keyword) return <>{text}</>;

  return (
    <>
      {text
        .split(keyword)
        .flatMap((str) => [
          <span key={keyword} style={{ backgroundColor: 'rgb(var(--yellow-4))' }}>
            {keyword}
          </span>,
          str,
        ])
        .slice(1)}
    </>
  );
};

export default Highlight;

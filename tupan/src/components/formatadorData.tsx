
import React from 'react';

interface FormatadorDataProps {
  dateString: string;
}

const FormatadorData: React.FC<FormatadorDataProps> = ({ dateString }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Altere aqui para o formato desejado
  };

  return <span>{formatDate(dateString)}</span>;
};

export default FormatadorData;

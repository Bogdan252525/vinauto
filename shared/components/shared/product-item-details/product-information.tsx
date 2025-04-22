import React from 'react';

interface Props {
  countryOfOrigin?: string | null;
  manufacturer?: string | null;
  status?: string | null;
  stock?: number | null;
  className?: string;
}

export const ProductInformation: React.FC<Props> = ({
  countryOfOrigin,
  manufacturer,
  status,
  stock,
  className,
}) => {
  return (
    <div className={className}>
      <p>
        <span className="mr-2">Країна виробник:</span>
        <span>{countryOfOrigin}</span>
      </p>
      <p>
        <span className="mr-2">Виробник:</span>
        <span>{manufacturer}</span>
      </p>
      <p>
        <span className="mr-2">Статус товару:</span>
        {status === 'AVAILABLE' ? (
          <span className="text-lime-600">в наявності</span>
        ) : (
          <span className="text-red-600">відсутній</span>
        )}
      </p>
      <p>
        <span className="mr-2">Кількість на складі:</span>
        <span>{stock}</span>
      </p>
    </div>
  );
};

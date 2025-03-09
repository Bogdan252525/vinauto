interface Props {
  name: string;
}

export const CartItemInfo: React.FC<Props> = ({ name }) => {

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg flex-1 leading-6 multi-line-cart">{name}</h2>
      </div>
    </div>
  );
};

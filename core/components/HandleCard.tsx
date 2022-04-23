interface IHandleCard {
  onChange?(): void;
}

const HandleCard = ({ onChange }: IHandleCard) => {
  return (
    <div className="site-layout-background bg-white p-4 min-h-full">
      HandleCard
    </div>
  );
};

export default HandleCard;

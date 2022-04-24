interface IHandleCard {
  onChange?(): void;
}

const HandleCard = ({ onChange }: IHandleCard) => {
  return (
    <div className=" bg-[linear-gradient(214deg,#3e434e,#23262b)] p-4 min-h-full rounded-xl text-white">
      <p className="text-lg">HandleCard</p>
    </div>
  );
};

export default HandleCard;

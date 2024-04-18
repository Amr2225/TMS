import { useState } from "react";
import { FaFire, FaTrash } from "react-icons/fa";

const DeleteArea = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const hanldeOnDrop = (e) => {
    const cardIdToRemove = +e.dataTransfer.getData("cardId"); // unary plus operator to convert string to number
    setCards((oldData) => oldData.filter((card) => card.id !== cardIdToRemove));
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={hanldeOnDrop}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl
    ${
      active
        ? "border-red-800 bg-red-800/20 text-red-500"
        : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
    }`}
    >
      {active ? <FaFire className='animate-bounce' /> : <FaTrash />}
    </div>
  );
};

export default DeleteArea;

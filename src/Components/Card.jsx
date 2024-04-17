import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

const Card = ({ title, id, column, TransferData }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        onDragStart={(e) => TransferData(e, { title, id, column })}
        draggable='true'
        className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 
      active:cursor-grabbing'
      >
        <p className='text-sm text-neutral-100'>{title}</p>
      </motion.div>
    </>
  );
};

export default Card;

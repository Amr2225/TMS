import { AnimatePresence, motion } from "framer-motion";

import { LiaCommentSolid } from "react-icons/lia";
import { useState } from "react";
import { CardMenu } from "../Modals";

const Card = ({ title, id, status, description }) => {
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [isCardMenuOpen, setIsCardMenuOpen] = useState(false);

  //The all the developers
  const developers = [
    {
      id: 1,
      name: "ziad Mohamed",
      taskId: 4,
    },
    {
      id: 2,
      name: "Walid",
      taskId: 3,
    },
    {
      id: 2,
      name: "Samir",
      taskId: 3,
    },
    {
      id: 2,
      name: "Hisham",
      taskId: 3,
    },
    {
      id: 2,
      name: "Amr",
      taskId: 3,
    },
    {
      id: 2,
      name: "Ali Khaled",
      taskId: 3,
    },
    {
      id: 2,
      name: "Marwan",
      taskId: 3,
    },
  ];

  const TransferData = (e, cardData) => {
    e.dataTransfer.setData("cardId", cardData.id);
    e.dataTransfer.setData("cardStatus", cardData.status);
  };

  // Assigned developers to each task
  const assignedDevelopers = developers.filter((developer) => developer.taskId === id);
  const firstFive = assignedDevelopers.slice(0, 5);
  const restCount = assignedDevelopers.slice(5).reduce((acc) => acc + 1, 0);

  return (
    <>
      <motion.div
        layout
        layoutId={id}
        onClick={() => setIsCardMenuOpen(true)}
        onDragStart={(e) => TransferData(e, { id, status })}
        draggable='true'
        className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 
      active:cursor-grabbing mb-2'
      >
        <p className='text-sm text-neutral-100'>{title}</p>
        <div className='flex justify-between mt-1'>
          <div className='flex ml-2'>
            {firstFive.map((developer) => (
              <span
                key={developer.id}
                title={developer.name}
                className={`w-5 h-5 shadow-icons -ml-2 bg-neutral-50 text-neutral-950 rounded-full grid place-content-center text-xs hover:z-50 hover:scale-105 transition duration-200`}
              >
                {developer.name[0].toUpperCase()}
              </span>
            ))}
            {restCount >= 1 && (
              <span
                className={`w-5 h-5 shadow-icons -ml-2  bg-violet-600/95 hover:bg-violet-500 cursor-pointer text-neutral-50 rounded-full grid place-content-center text-xs`}
              >
                {"+" + restCount}
              </span>
            )}
          </div>
          <div
            className='relative cursor-pointer'
            onMouseEnter={() => setIsCommentMenuOpen(true)}
            onMouseLeave={() => setIsCommentMenuOpen(false)}
          >
            <LiaCommentSolid
              className={`border border-neutral-100/40 w-6 h-6 p-1 rounded-sm text-neutral-200 transition-all duration-100 ${
                isCommentMenuOpen && "bg-neutral-100 text-neutral-900 scale-125"
              }`}
            />
            <AnimatePresence>
              {isCommentMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  style={{ x: "-50%" }}
                  className='rounded border border-neutral-700 bg-neutral-800 p-3 absolute text-neutral-100 text-sm left-1/2 top-8 z-10 w-max'
                >
                  3 Comments
                  <div className='w-full h-4 bg-transparent absolute -top-4 left-0' />{" "}
                  {/*Just for the hover effect to work properly*/}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      {isCardMenuOpen && (
        <CardMenu
          taskId={id}
          title={title}
          description={description}
          setIsCardMenuOpen={setIsCardMenuOpen}
        />
      )}
    </>
  );
};

export default Card;

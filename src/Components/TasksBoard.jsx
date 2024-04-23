import { useState } from "react";
import Column from "./TasksBoard/Column";

import { DEFAULT_CARDS } from "../Data/ColumnsData";
import DeleteArea from "./TasksBoard/DeleteArea";

const TasksBoard = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <>
      <h1 className='text-4xl text-neutral-200'>DevOps Board</h1>
      <div className='flex h-full w-full gap-3  p-12'>
        <Column
          title='Backlog'
          column='backlog'
          headingColor='text-neutral-500'
          cards={cards}
          setCards={setCards}
        />
        <Column
          title='TODO'
          column='todo'
          headingColor='text-yellow-200'
          cards={cards}
          setCards={setCards}
        />
        <Column
          title='In Progress'
          column='in-progress'
          headingColor='text-blue-200'
          cards={cards}
          setCards={setCards}
        />
        <Column
          title='Done'
          column='done'
          headingColor='text-emerald-200'
          cards={cards}
          setCards={setCards}
        />
        <DeleteArea setCards={setCards} />
      </div>
      {/* {isCardMenuActive && <CardMenu />} */}
    </>
  );
};

export default TasksBoard;

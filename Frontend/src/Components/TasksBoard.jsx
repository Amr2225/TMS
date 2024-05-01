import Column from "./TasksBoard/Column";
import DeleteArea from "./TasksBoard/DeleteArea";

const TasksBoard = () => {
  return (
    <>
      <h1 className='text-4xl text-neutral-200'>DevOps Board</h1>
      <div className='flex h-full w-full gap-3  p-12'>
        <Column title='Backlog' column='backlog' headingColor='text-neutral-500' />
        <Column title='TODO' column='todo' headingColor='text-yellow-200' />
        <Column title='In Progress' column='in-progress' headingColor='text-blue-200' />
        <Column title='Done' column='done' headingColor='text-emerald-200' />
        <DeleteArea />
      </div>
    </>
  );
};

export default TasksBoard;

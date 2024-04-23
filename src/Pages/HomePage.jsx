import { Sidebar, TasksBoard } from "../Components";

const HomePage = () => {
  return (
    <div className='flex flex-row overflow-y-hidden '>
      <Sidebar />
      <section className='flex flex-col p-10 pr-0 pl-5 w-full overflow-y-hidden'>
        <TasksBoard />
      </section>
    </div>
  );
};

export default HomePage;

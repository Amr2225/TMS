import { Sidebar, TasksBoard } from "./Components";

function App() {
  return (
    <div className='flex flex-row gap-4'>
      <Sidebar />
      <section className='flex flex-col p-10 w-full'>
        <TasksBoard />
      </section>
    </div>
  );
}

export default App;

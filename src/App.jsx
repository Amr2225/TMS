import { Sidebar, TasksBoard } from "./Components";

function App() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <section className='flex flex-col p-10 pr-0 pl-5 w-full'>
        <TasksBoard />
      </section>
    </div>
  );
}

export default App;

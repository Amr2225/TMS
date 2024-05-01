import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Sidebar, TasksBoard } from "../Components";
import { LoadingSpinner } from "../Components";
import { useGetTasksQuery } from "../Redux/apis/taskApi";

const HomePage = () => {
  // const [isAuthroized, setIsAuthrozed] = useState(false);
  const { isAuthed } = useSelector((state) => state.auth);
  const { taskData } = useSelector((state) => state.tasks);
  const { userData } = useSelector((state) => state.user);

  if (!isAuthed) {
    return <Navigate to='/login' />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isError } = useGetTasksQuery(
    { id: userData.id, role: userData.role, projectId: 1 },
    { refetchOnMountOrArgChange: true }
  );

  console.log("Fetched data", data);
  console.log("saved Data", taskData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h1>Error happend</h1>;
  }

  return (
    <div className='flex flex-row overflow-y-hidden '>
      <Sidebar />
      <section className='flex flex-col p-10 pr-0 pl-5 w-full overflow-y-hidden'>
        {/* <TasksBoard /> */}
        <Outlet />
      </section>
    </div>
  );
};

export default HomePage;

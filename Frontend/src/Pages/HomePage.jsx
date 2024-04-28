import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { Sidebar, TasksBoard } from "../Components";
import { getAuthToken } from "../services/auth/auth";
import apis from "../services/api";

import { LoadingSpinner } from "../Components";

const HomePage = () => {
  const [isAuthroized, setIsAuthrozed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await apis.tasks.get("/GetAllTasks", {
          headers: { Authorization: `Bearer ${getAuthToken().token}` }, // Sending the token
        });
        console.log(data);
        setIsAuthrozed(true);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.StatusCode == 401) setIsAuthrozed(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthroized ? (
    <div className='flex flex-row overflow-y-hidden '>
      <Sidebar />

      <section className='flex flex-col p-10 pr-0 pl-5 w-full overflow-y-hidden'>
        <TasksBoard />
      </section>
    </div>
  ) : (
    navigate("/login")
  );
};

export default HomePage;

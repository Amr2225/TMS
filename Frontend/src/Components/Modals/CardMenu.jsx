import { useEffect, useRef, useState } from "react";
import { BiPencil } from "react-icons/bi";

import { commentsData } from "../../Data/CommentsData";
import Comments from "./Comments";

const CardMenu = ({ title, taskId, description, setIsCardMenuOpen }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [descriptionData, setDescriptionData] = useState(description);
  const [comments, setComments] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Replace this code with the api request to get the all the comments based on the task id
    const Currentcomment = commentsData.filter((c) => c.taskId === taskId);
    /////////////////

    setComments(Currentcomment);
  }, []);

  const handleMenuClose = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsCardMenuOpen(false);
    }
  };

  const handleDescriptionUpdate = () => {
    setIsEditingDescription(false);

    //Update the description;
  };

  return (
    <div
      onClick={handleMenuClose}
      className='fixed top-1/2 left-1/2 inset-0 -translate-x-[50%] -translate-y-[50%] grid place-content-center backdrop-blur-sm  h-screen w-screen z-50'
    >
      <div
        ref={containerRef}
        className='bg-neutral-800 border border-neutral-700 shadow-xl rounded-md text-neutral-100 p-10 w-[600px] h-[600px] overflow-scroll overflow-x-hidden scroll-bar-webkit'
      >
        <h1 className='border-b mb-8 text-2xl pb-1'>{title}</h1>

        {/* Editing the Description Logic */}
        {!isEditingDescription ? (
          <>
            <div className=' rounded-md w-full'>{descriptionData}</div>{" "}
            <BiPencil
              className='mb-16 hover:text-neutral-400 cursor-pointer'
              onClick={() => setIsEditingDescription(true)}
            />
          </>
        ) : (
          <>
            <textarea
              onChange={(e) => setDescriptionData(e.target.value)}
              className={`bg-violet-400/20 border border-violet-400 w-full resize-none overflow-hidden rounded-md px-2 py-2  scroll-bar-hidden overflow-y-scroll focus:outline-none 
              h-[150px]`}
            >
              {descriptionData}
            </textarea>
            <button
              onClick={handleDescriptionUpdate}
              className='px-6 py-1 bg-neutral-50 text-neutral-900 hover:bg-neutral-300 hover:scale-95 transition duration-200 rounded-md mb-12 mt-1 text-sm'
            >
              Submit
            </button>
          </>
        )}
        {/* End of the Editing Description Logic */}

        {/* Comments Section */}
        {comments.map((comment) => (
          <Comments key={comment.id} {...comment} />
        ))}
        {/* End of Comments Section */}

        {/* Add Comment Section */}
        <form>
          <textarea
            placeholder='Add Comment..'
            className='border bg-neutral-700 border-neutral-600 focus:border-violet-400 focus:bg-violet-400/20 resize-none rounded-md mt-2 w-[90%] focus:outline-none py-3 px-3'
          />
          <div className='mt-1 flex justify-between items-center'>
            <button
              type='submit'
              className='bg-neutral-50 hover:bg-neutral-300 hover:scale-95 transition duration-200 text-neutral-950 rounded-md px-6 py-1'
            >
              Add Comment
            </button>
            <button className='bg-green-700 text-neutral-50 rounded-md px-6 py-1 hover:scale-95 hover:bg-green-800 transition duration-200'>
              Add Attachment
            </button>
          </div>
        </form>
        {/* End of Add Comment Section */}
      </div>
    </div>
  );
};

export default CardMenu;

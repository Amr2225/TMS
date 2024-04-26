using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TaskController(DatabaseContext dbContext) : ControllerBase
    {
        private readonly DatabaseContext _dbContext = dbContext;

        [HttpPost]
        public JsonResult Create(Tasks task)
        {
            var project = _dbContext.Projects.Find(task.ProjectId);
            task.Project = project;

            _dbContext.Tasks.Add(task);
            _dbContext.SaveChanges();

            return new JsonResult(Ok(task));
        }

        [HttpGet]
        public JsonResult GetAllTasks()
        {
            var tasks = _dbContext.GetAllTasks();
            return new JsonResult(Ok(tasks));
        }

        [HttpPost]
        public JsonResult AssignTask(TaskDetails taskDetails)
        {
            var tasks = _dbContext.Tasks.Find(taskDetails.TaskId);
            var project = _dbContext.Projects.Find(tasks.ProjectId);
            var user = _dbContext.Users.Find(taskDetails.UserId);

            tasks.Project = project;
            string status = Models.Types.TaskStatus.backlog;

            AssignedTasks task = new()
            {
                UserId = taskDetails.UserId,
                TaskId = taskDetails.TaskId,
                Users = user,
                Tasks = tasks,
                Status = status,
                Attachments = null
            };

            _dbContext.AssignedTasks.Add(task);
            _dbContext.SaveChanges();

            return new JsonResult(Ok(task));
        }

        [HttpGet]
        public JsonResult GetAllAssignedTasks()
        {
            var assignedTasks = _dbContext.GetAllAssignedTasks();
            return new JsonResult(Ok(assignedTasks));
        }

    }
}
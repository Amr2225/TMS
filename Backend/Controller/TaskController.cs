using Backend.DTOs;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Backend.DTOs.Sent;
using Microsoft.AspNetCore.Components.Web;

namespace Backend.Controller
{
    // [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TaskController(IDataRepository<Tasks> taskRepo, IDataRepository<AssignedTasks> AssignedTaskRepo, IDataRepository<Users> userRepo) : ControllerBase
    {
        private readonly IDataRepository<Tasks> _taskRepo = taskRepo;
        private readonly IDataRepository<AssignedTasks> _assignedTasksRepo = AssignedTaskRepo;
        private readonly IDataRepository<Users> _usersRepo = userRepo;

        [HttpPost]
        public async Task<IActionResult> Create(CreateTaskDto task)
        {
            if (task == null)
                return BadRequest("A Task is required");

            Tasks tasks = new()
            {
                Title = task.Title,
                Description = task.Description,
                ProjectId = task.ProjectId,
            };

            await _taskRepo.AddAsync(tasks);
            await _taskRepo.Save();

            return Ok();
        }

        [HttpGet]
        public async Task<JsonResult> GetAllTasks()
        {
            return new JsonResult(Ok(await _taskRepo.GetAllTasksAsync()));
        }
        [HttpGet]
        public async Task<JsonResult> GetTasks(int userId, int role)
        {
            var tasks = await _taskRepo.GetAllAsync();
            if (tasks == null)
                return new JsonResult(NotFound());

            List<TaskDto> taskToSent = [];
            foreach (var task in tasks)
            {
                taskToSent.Add(new()
                {
                    Id = task.Id,
                    Title = task.Title,
                    Description = task.Description,
                    Status = task.Status,
                    Editable = role == 2
                });
            }
            if (role == 2) //Team Leader Tasks
                return new JsonResult(Ok(taskToSent));

            else if (role == 1) //Developer Tasks
            {
                var userTasks = _usersRepo.GetAllDevTasksAsync(userId);
                await foreach (var userTask in userTasks)
                {
                    foreach (var taskAssignedToUser in userTask?.AssignedTasks ?? [])
                    {
                        foreach (var task in taskToSent)
                        {
                            if (taskAssignedToUser.TaskId == task.Id)
                            {
                                task.Editable = true; //To let the corresponding user edit the tasks that is assigned to him only
                            }
                        }
                    }
                }
                return new JsonResult(Ok(taskToSent));
            }

            return new JsonResult(BadRequest());
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTask(CreateTaskDto updatedTask)
        {
            if (updatedTask == null)
                return BadRequest(); // Return 400 Bad Request if the request body is null or if the IDs don't match

            var taskToUpdate = await _taskRepo.GetByIdAsync(updatedTask.Id ?? 0); //null-coalescing operator to provide a default

            if (taskToUpdate == null)
                return NotFound(); // Return 404 if project with given ID is not found

            // Update the properties of the Task
            taskToUpdate.Title = updatedTask.Title;
            taskToUpdate.Description = updatedTask.Description;
            taskToUpdate.ProjectId = updatedTask.ProjectId;

            _taskRepo.Update(taskToUpdate);
            await _taskRepo.Save();

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var taskToDelete = await _taskRepo.GetByIdAsync(id);

            if (taskToDelete == null)
            {
                return NotFound();
            }

            _taskRepo.Delete(taskToDelete);
            await _taskRepo.Save();

            return Ok();
        }



        // Assigned Tasks
        [HttpPost]
        public async Task<IActionResult> AssignTask(AssignedTaskDto taskDetails)
        {
            AssignedTasks assignedTask = new()
            {
                UserId = taskDetails.UserId,
                TaskId = taskDetails.TaskId,

                Attachments = taskDetails.Attachments
            };

            await _assignedTasksRepo.AddAsync(assignedTask);
            await _assignedTasksRepo.Save();

            return Ok();
        }

        [HttpGet]
        public async Task<JsonResult> GetAllAssignedTasks()
        {
            return new JsonResult(Ok(await _assignedTasksRepo.GetAllAssignedTasks()));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAssignedTask(AssignedTaskDto updatedTask)
        {
            if (updatedTask == null)
                return BadRequest();

            var taskToUpdate = await _assignedTasksRepo.GetByIdAsync(updatedTask.UserId, updatedTask.TaskId);

            if (taskToUpdate == null)
                return NotFound();

            // Update the properties of the AssignedTask
            taskToUpdate.Attachments = updatedTask.Attachments;

            _assignedTasksRepo.Update(taskToUpdate);
            await _assignedTasksRepo.Save();

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAssignedTask(int userId, int taskId)
        {
            var taskToDelete = await _assignedTasksRepo.GetByIdAsync(userId, taskId);

            if (taskToDelete == null)
                return NotFound();

            _assignedTasksRepo.Delete(taskToDelete);
            await _assignedTasksRepo.Save();

            return Ok();

        }

    }
}
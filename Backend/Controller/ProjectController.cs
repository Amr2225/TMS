using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;

namespace Backend.Controller
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProjectController(IDataRepository<Projects> projectRepo) : ControllerBase
    {
        private readonly IDataRepository<Projects> _projectRepo = projectRepo;

        [HttpPost]
        public async Task<IActionResult> Create(ProjectDto project)
        {
            Projects projectToAdd = new()
            {
                Title = project.Title
            };

            await _projectRepo.AddAsync(projectToAdd);
            await _projectRepo.Save();
            return Ok();
        }

        [HttpGet]
        public async Task<IEnumerable<Projects>> GetAll()
        {
            var projects = await _projectRepo.GetAllAsync();
            return projects;
        }
    }
}
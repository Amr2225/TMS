using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProjectController(DatabaseContext dbContext) : ControllerBase
    {
        private readonly DatabaseContext _dbContext = dbContext;

        [HttpPost]
        public JsonResult Create(Projects project)
        {
            _dbContext.Projects.Add(project);
            _dbContext.SaveChanges();
            return new JsonResult(Ok(project));
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var projects = _dbContext.Projects.ToList();
            return new JsonResult(Ok(projects));
        }
    }
}
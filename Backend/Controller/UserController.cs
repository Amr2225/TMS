using Backend.Modals;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller
{
    [Route("/api/[controller]/[action]")]
    [ApiController]
    public class UserController(DatabaseContext dbContext) : ControllerBase
    {
        private readonly DatabaseContext _dbContext = dbContext;

        [HttpPost]
        public JsonResult Create(Users user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return new JsonResult(Ok(user));
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var users = _dbContext.Users.ToList();
            return new JsonResult(Ok(users));
        }
    }
}
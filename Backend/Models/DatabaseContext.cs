using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
    {

        public DbSet<Users> Users { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<ProjectsStatus> ProjectsStatus { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<AssignedTasks> AssignedTasks { get; set; }
        public DbSet<Comments> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AssignedTasks>().HasKey(x => new { x.UserId, x.TaskId }); // Composite primary key

            builder.Entity<ProjectsStatus>().HasKey(x => new { x.UserId, x.ProjectId }); // Composite primary key
        }

        public ICollection<Tasks> GetAllTasks()
        {
            using var context = new DatabaseContext(options);
            var allTasks = context.Tasks.Include(t => t.Project).ToList();

            return allTasks;
        }

        public ICollection<AssignedTasks> GetAllAssignedTasks()
        {
            using var context = new DatabaseContext(options);
            var allAssignedTasks = context.AssignedTasks.Include(x => x.Users).Include(x => x.Tasks).ThenInclude(x => x.Project).ToList();

            return allAssignedTasks;
        }
    }
}
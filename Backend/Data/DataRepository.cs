using Microsoft.EntityFrameworkCore;
using Backend.Models;
using System.Collections;

namespace Backend.Data
{
    public class DataRepository<T> : IDataRepository<T> where T : class
    {
        private readonly DatabaseContext _dbContext;
        private readonly DbSet<T> table;

        public DataRepository(DatabaseContext db)
        {
            _dbContext = db;
            table = _dbContext.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await table.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await table.FindAsync(id);
        }

        public async Task AddAsync(T entity)
        {
            await table.AddAsync(entity);
        }

        public void Update(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            table.Remove(entity);
        }

        public async Task<bool> Save()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<T>> GetAllUsersAsync()
        {
            return await table.Include("Role").ToListAsync();
        }

        public async Task<IEnumerable<Tasks>> GetAllTasksAsync(int projectId)
        {
            return await _dbContext.Tasks.Where(x => x.ProjectId == projectId).ToListAsync();
        }

        public async IAsyncEnumerable<Users?> GetAllDevTasksAsync(int id)
        {
            yield return await _dbContext.Users.Include(x => x.AssignedTasks).Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetAllAssignedTasks()
        {
            return await table.Include("Users").Include("Tasks").ToListAsync();
        }

        public async Task<AssignedTasks?> GetByIdAsync(int userId, int taskId)
        {
            return await _dbContext.AssignedTasks.Where(x => x.UserId == userId && x.TaskId == taskId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetAllCommentsAsync()
        {
            return await table.Include("Users").Include("Tasks").ToListAsync();
        }
    }
}

using Backend.Models;

namespace Backend.Data
{
    public interface IDataRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> Save();
        Task<IEnumerable<Tasks>> GetAllTasksAsync(int projectId);
        IAsyncEnumerable<Users?> GetAllDevTasksAsync(int id);
        Task<IEnumerable<T>> GetAllUsersAsync();
        Task<IEnumerable<T>> GetAllAssignedTasks();
        Task<IEnumerable<T>> GetAllCommentsAsync();
        Task<AssignedTasks?> GetByIdAsync(int userId, int taskId);
    }
}

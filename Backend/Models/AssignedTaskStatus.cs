using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class AssignedTaskStatus
    {
        [Key]
        public int Id { get; set; }
        public string Status { get; set; } // 1-backlog 2-todo 3-in-progress 4-
    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class AssignedTasks
    {
        // Foreign keys
        public int UserId { get; set; }
        public int TaskId { get; set; }

        // Navigation Properties
        [ForeignKey("UserId")]
        public virtual Users? Users { get; set; }
        [ForeignKey("TaskId")]
        public virtual Tasks? Tasks { get; set; }
        // Cannot make it of type List..

        // Rest of the attributes
        public string? Status { get; set; }
        public string? Attachments { get; set; }
    }
}
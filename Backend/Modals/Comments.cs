using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Modals
{
    public class Comments
    {
        //Primary key
        [Key]
        public int Id { get; set; }

        //Foreign keys
        public int UserId { get; set; }
        public int TaskId { get; set; }

        //Navigation Properties
        [ForeignKey("UserId")]
        public virtual Users? Users { get; set; }
        [ForeignKey("TaskId")]
        public virtual Tasks? Tasks { get; set; }

        //Rest of the attributes
        public string? Comment { get; set; }
    }
}
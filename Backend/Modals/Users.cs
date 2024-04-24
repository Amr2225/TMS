using System.ComponentModel.DataAnnotations;
using Backend.Modals.Types;

namespace Backend.Modals
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string? FristName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
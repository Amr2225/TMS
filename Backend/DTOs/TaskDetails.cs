namespace Backend.DTOs
{
    public record TaskDetails
    {
        public int UserId { get; set; }
        public int TaskId { get; set; }
    }
}
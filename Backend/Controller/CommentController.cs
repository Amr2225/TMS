using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class CommentController(IDataRepository<Comments> commentRepo) : ControllerBase
    {
        private readonly IDataRepository<Comments> _commentRepo = commentRepo;

        //Dev and Team Leader APIs
        //CREATE
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommentDto newComment)
        {
            if (newComment == null)
                return BadRequest();

            Comments commentToAdd = new()
            {
                UserId = newComment.UserId,
                TaskId = newComment.TaskId,
                Comment = newComment.Comment,
            };

            await _commentRepo.AddAsync(commentToAdd);
            await _commentRepo.Save();

            return Ok();
        }

        //READ
        [HttpGet]
        public async Task<IEnumerable<Comments>> GetComments(int taskId)
        {
            return await _commentRepo.GetAllCommentsAsync(taskId);
        }

        //UPDATE
        [HttpPost]
        public async Task<IActionResult> UpdateComment(UpdateCommentDto updatedComment)
        {
            if (updatedComment == null)
                return BadRequest();

            var commentToUpdate = await _commentRepo.GetByIdAsync(updatedComment.Id);
            if (commentToUpdate == null)
                return NotFound();

            commentToUpdate.Comment = updatedComment.Comment;

            _commentRepo.Update(commentToUpdate);
            await _commentRepo.Save();

            return Ok();
        }

        //DELETE
        [HttpDelete]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var CommentToDelete = await _commentRepo.GetByIdAsync(id);
            if (CommentToDelete == null)
                return NotFound();

            _commentRepo.Delete(CommentToDelete);
            await _commentRepo.Save();

            return Ok();
        }
    }
}
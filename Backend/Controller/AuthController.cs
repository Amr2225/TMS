using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Backend.Models;
using Backend.Data;
using Backend.Dtos;
#pragma warning disable CS8601 // Possible null reference assignment.

namespace Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IConfiguration configuration, IDataRepository<Users> userRepository, DatabaseContext dbContext) : ControllerBase
    {
        private readonly IConfiguration configuration = configuration;
        private readonly IDataRepository<Users> _userRepository = userRepository;

        private readonly DatabaseContext _dbContext = dbContext;

        [HttpPost("register")]
        public async Task<ActionResult<Users>> Rejester(RejesterDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            Users user = new()
            {
                Email = request.Email,
                FristName = request.FristName,
                LastName = request.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = request.Role
            };

            await _userRepository.AddAsync(user);
            await _userRepository.Save();

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(UserDto request)
        {
            Users registerdUser;
            try
            {
                registerdUser = _dbContext.Users.Where(x => x.Email == request.Email).First();

            }
            catch (InvalidOperationException)
            {

                return BadRequest("User not found");
            }

            if (!VerifyPasswordHash(request.Password, registerdUser.PasswordHash, registerdUser.PasswordSalt))
            {
                return BadRequest("wrong password");
            }
            string token = CreateToken(registerdUser);
            return Ok(token);
        }

        private string CreateToken(Users User)
        {
            List<Claim> claims =
            [
                new Claim(ClaimTypes.Name, User.Email)
            ];

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }

    }
}

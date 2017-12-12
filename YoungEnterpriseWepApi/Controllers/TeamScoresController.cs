using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoungEnterpriseWepApi.Models;

namespace YoungEnterpriseWepApi.Controllers
{
    [Produces("application/json")]
    [Route("api/TeamScores")]
    public class TeamScoresController : Controller
    {
        private readonly DBYoungEnterPriseContext _context;

        public TeamScoresController(DBYoungEnterPriseContext context)
        {
            _context = context;
        }

        // GET: api/TeamScores
        [HttpGet]
        public IEnumerable<TeamScore> GetTeamScore()
        {
            return _context.TeamScore;
        }

        // GET: api/TeamScores/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamScore([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var teamScore = await _context.TeamScore.SingleOrDefaultAsync(m => m.ScoreId == id);

            if (teamScore == null)
            {
                return NotFound();
            }

            return Ok(teamScore);
        }

        // PUT: api/TeamScores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeamScore([FromRoute] int id, [FromBody] TeamScore teamScore)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != teamScore.ScoreId)
            {
                return BadRequest();
            }

            _context.Entry(teamScore).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamScoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TeamScores
        [HttpPost]
        public async Task<IActionResult> PostTeamScore([FromBody] TeamScore teamScore)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TeamScore.Add(teamScore);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeamScore", new { id = teamScore.ScoreId }, teamScore);
        }

        // DELETE: api/TeamScores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeamScore([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var teamScore = await _context.TeamScore.SingleOrDefaultAsync(m => m.ScoreId == id);
            if (teamScore == null)
            {
                return NotFound();
            }

            _context.TeamScore.Remove(teamScore);
            await _context.SaveChangesAsync();

            return Ok(teamScore);
        }

        private bool TeamScoreExists(int id)
        {
            return _context.TeamScore.Any(e => e.ScoreId == id);
        }
    }
}
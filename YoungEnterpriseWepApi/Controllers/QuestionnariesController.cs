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
    [Route("api/Questionnaries")]
    public class QuestionnariesController : Controller
    {
        private readonly DBYoungEnterPriseContext _context;

        public QuestionnariesController(DBYoungEnterPriseContext context)
        {
            _context = context;
        }

        // GET: api/Questionnaries
        [HttpGet]
        public IEnumerable<Questionnarie> GetQuestionnarie()
        {
            return _context.Questionnarie;
        }

        // GET: api/Questionnaries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestionnarie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var questionnarie = await _context.Questionnarie.SingleOrDefaultAsync(m => m.QuestionnarieId == id);

            if (questionnarie == null)
            {
                return NotFound();
            }

            return Ok(questionnarie);
        }

        // PUT: api/Questionnaries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestionnarie([FromRoute] int id, [FromBody] Questionnarie questionnarie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != questionnarie.QuestionnarieId)
            {
                return BadRequest();
            }

            _context.Entry(questionnarie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionnarieExists(id))
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

        // POST: api/Questionnaries
        [HttpPost]
        public async Task<IActionResult> PostQuestionnarie([FromBody] Questionnarie questionnarie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Questionnarie.Add(questionnarie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestionnarie", new { id = questionnarie.QuestionnarieId }, questionnarie);
        }

        // DELETE: api/Questionnaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestionnarie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var questionnarie = await _context.Questionnarie.SingleOrDefaultAsync(m => m.QuestionnarieId == id);
            if (questionnarie == null)
            {
                return NotFound();
            }

            _context.Questionnarie.Remove(questionnarie);
            await _context.SaveChangesAsync();

            return Ok(questionnarie);
        }

        private bool QuestionnarieExists(int id)
        {
            return _context.Questionnarie.Any(e => e.QuestionnarieId == id);
        }
    }
}
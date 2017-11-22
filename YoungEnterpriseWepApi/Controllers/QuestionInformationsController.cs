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
    [Route("api/QuestionInformations")]
    public class QuestionInformationsController : Controller
    {
        private readonly DBYoungEnterPriseContext _context;

        public QuestionInformationsController(DBYoungEnterPriseContext context)
        {
            _context = context;
        }

        // GET: api/QuestionInformations
        [HttpGet]
        public IEnumerable<QuestionInformation> GetQuestionInformation()
        {
            return _context.QuestionInformation;
        }

        // GET: api/QuestionInformations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestionInformation([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var questionInformation = await _context.QuestionInformation.SingleOrDefaultAsync(m => m.InfoId == id);

            if (questionInformation == null)
            {
                return NotFound();
            }

            return Ok(questionInformation);
        }

        // PUT: api/QuestionInformations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestionInformation([FromRoute] int id, [FromBody] QuestionInformation questionInformation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != questionInformation.InfoId)
            {
                return BadRequest();
            }

            _context.Entry(questionInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionInformationExists(id))
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

        // POST: api/QuestionInformations
        [HttpPost]
        public async Task<IActionResult> PostQuestionInformation([FromBody] QuestionInformation questionInformation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.QuestionInformation.Add(questionInformation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestionInformation", new { id = questionInformation.InfoId }, questionInformation);
        }

        // DELETE: api/QuestionInformations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestionInformation([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var questionInformation = await _context.QuestionInformation.SingleOrDefaultAsync(m => m.InfoId == id);
            if (questionInformation == null)
            {
                return NotFound();
            }

            _context.QuestionInformation.Remove(questionInformation);
            await _context.SaveChangesAsync();

            return Ok(questionInformation);
        }

        private bool QuestionInformationExists(int id)
        {
            return _context.QuestionInformation.Any(e => e.InfoId == id);
        }
    }
}
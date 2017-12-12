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
    [Route("api/TimeShedules")]
    public class TimeShedulesController : Controller
    {
        private readonly DBYoungEnterPriseContext _context;

        public TimeShedulesController(DBYoungEnterPriseContext context)
        {
            _context = context;
        }

        // GET: api/TimeShedules
        [HttpGet]
        public IEnumerable<TimeShedule> GetTimeShedule()
        {
            return _context.TimeShedule;
        }

        // GET: api/TimeShedules/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTimeShedule([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var timeShedule = await _context.TimeShedule.SingleOrDefaultAsync(m => m.SheduleId == id);

            if (timeShedule == null)
            {
                return NotFound();
            }

            return Ok(timeShedule);
        }

        // PUT: api/TimeShedules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimeShedule([FromRoute] int id, [FromBody] TimeShedule timeShedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != timeShedule.SheduleId)
            {
                return BadRequest();
            }

            _context.Entry(timeShedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeSheduleExists(id))
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

        // POST: api/TimeShedules
        [HttpPost]
        public async Task<IActionResult> PostTimeShedule([FromBody] TimeShedule timeShedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TimeShedule.Add(timeShedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimeShedule", new { id = timeShedule.SheduleId }, timeShedule);
        }

        // DELETE: api/TimeShedules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeShedule([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var timeShedule = await _context.TimeShedule.SingleOrDefaultAsync(m => m.SheduleId == id);
            if (timeShedule == null)
            {
                return NotFound();
            }

            _context.TimeShedule.Remove(timeShedule);
            await _context.SaveChangesAsync();

            return Ok(timeShedule);
        }

        private bool TimeSheduleExists(int id)
        {
            return _context.TimeShedule.Any(e => e.SheduleId == id);
        }
    }
}
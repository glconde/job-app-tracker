using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobAppTrackerApi.Data;
using JobAppTrackerApi.Models;

namespace JobAppTrackerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobApplicationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /api/jobapplications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetAll()
        {
            var applications = await _context.JobApplications.OrderByDescending(a => a.CreatedAt).ToListAsync();
            return Ok(applications);
        }

        // GET: /api/jobapplications/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetById(int id)
        {
            var item = await _context.JobApplications.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // POST: /api/jobapplications
        [HttpPost]
        public async Task<ActionResult<JobApplication>> Post([FromBody] JobApplication application)
        {
            _context.JobApplications.Add(application);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = application.Id }, application);
        }

        // PUT: /api/jobapplications/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, JobApplication application)
        {
            if (id != application.Id)
            {
                return BadRequest();
            }

            var existingApplication = await _context.JobApplications.FindAsync(id);
            if (existingApplication == null)
            {
                return NotFound();
            }

            existingApplication.CompanyName = application.CompanyName;
            existingApplication.JobTitle = application.JobTitle;
            existingApplication.Status = application.Status;
            existingApplication.DateApplied = application.DateApplied;
            existingApplication.JobUrl = application.JobUrl;
            existingApplication.Location = application.Location;
            existingApplication.Notes = application.Notes;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: /api/jobapplications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var application = await _context.JobApplications.FindAsync(id);
            if (application == null)
            {
                return NotFound();
            }

            _context.JobApplications.Remove(application);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
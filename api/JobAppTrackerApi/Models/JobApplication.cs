using System;

namespace JobAppTrackerApi.Models
{
    /// <summary>
    /// Represents a job application record.
    /// </summary>
    public class JobApplication
    {
        public int Id { get; set; }

        public string CompanyName { get; set; } = string.Empty;

        public string JobTitle { get; set; } = string.Empty;

        public ApplicationStatus Status { get; set; }

        public DateTime DateApplied { get; set; }

        public string? JobUrl { get; set; }

        public string? Location { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
namespace JobAppTrackerApi.Models
{
    /// <summary>
    /// Represents the current status of a job application.
    /// </summary>
    public enum ApplicationStatus
    {
        Interested,
        Applied,
        Interviewing,
        Offer,
        Rejected,
        Archived
    }
}

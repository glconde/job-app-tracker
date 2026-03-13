import { ApplicationStatus } from './application-status.enum';

export interface JobApplicationFormModel {
  companyName: string;
  jobTitle: string;
  status: ApplicationStatus;
  dateApplied: string;
  jobUrl: string;
  location: string;
  notes: string;
}

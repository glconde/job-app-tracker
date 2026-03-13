import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobApplicationService } from '../../../core/services/job-application.service';
import { JobApplication } from '../../../core/models/job-application.model';
import { ApplicationStatus } from '../../../core/models/application-status.enum';
import { JobApplicationFormModel } from '../../../core/models/job-application-form-model';

@Component({
  selector: 'app-job-applications-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>My Applications</h2>

    <h3>{{ editingId === null ? 'Add Application' : 'Edit Application' }}</h3>

    <form (ngSubmit)="saveApplication()">
      <div>
        <input
          type="text"
          placeholder="Company"
          [(ngModel)]="formModel.companyName"
          name="companyName"
          required
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Job Title"
          [(ngModel)]="formModel.jobTitle"
          name="jobTitle"
          required
        />
      </div>

      <div>
        <select [(ngModel)]="formModel.status" name="status">
          <option *ngFor="let s of statusOptions" [value]="s">
            {{ s }}
          </option>
        </select>
      </div>

      <div>
        <input type="date" [(ngModel)]="formModel.dateApplied" name="dateApplied" required />
      </div>

      <div>
        <input type="url" placeholder="Job URL" [(ngModel)]="formModel.jobUrl" name="jobUrl" />
      </div>

      <div>
        <input
          type="text"
          placeholder="Location"
          [(ngModel)]="formModel.location"
          name="location"
        />
      </div>

      <div>
        <textarea
          placeholder="Notes"
          [(ngModel)]="formModel.notes"
          name="notes"
          rows="3"
        ></textarea>
      </div>

      <button type="submit" [disabled]="loading">
        {{ editingId === null ? 'Add Application' : 'Save Changes' }}
      </button>

      <button *ngIf="editingId !== null" type="button" (click)="cancelEdit()" [disabled]="loading">
        Cancel
      </button>
    </form>

    <div *ngIf="loading">Loading...</div>

    <div *ngIf="error" class="error">{{ error }}</div>

    <div *ngIf="!loading && !error">
      <div *ngIf="applications.length === 0" class="empty-state">No job applications found.</div>

      <ul *ngIf="applications.length > 0">
        <li *ngFor="let app of applications; trackBy: trackById">
          <strong>{{ app.companyName }}</strong>
          — {{ app.jobTitle }} ({{ app.status }})

          <button type="button" (click)="editApplication(app)" [disabled]="editingId !== null">
            Edit
          </button>
          <button type="button" (click)="deleteApplication(app.id)" [disabled]="editingId !== null">
            Delete
          </button>
        </li>
      </ul>
    </div>
  `,
})
export class JobApplicationsPageComponent implements OnInit {
  private service = inject(JobApplicationService);
  applications: JobApplication[] = [];
  loading = false;
  error = '';
  editingId: number | null = null;
  editingCreatedAt: string | null = null;
  statusOptions = Object.values(ApplicationStatus);
  formInitialState: JobApplicationFormModel = {
    companyName: '',
    jobTitle: '',
    status: ApplicationStatus.Applied,
    dateApplied: new Date().toISOString().slice(0, 10),
    jobUrl: '',
    location: '',
    notes: '',
  };
  formModel = { ...this.formInitialState };

  loadApplications(): void {
    this.loading = true;
    this.error = '';

    this.service.getAll().subscribe({
      next: (data) => {
        this.applications = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message
          ? `Failed to load applications: ${err.message}`
          : 'Failed to load applications';
        this.loading = false;
      },
    });
  }

  saveApplication(): void {
    if (!this.formModel.companyName.trim() || !this.formModel.jobTitle.trim()) {
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.editingId === null) {
      this.service.create(this.formModel).subscribe({
        next: (newApplication) => {
          this.applications = [...this.applications, newApplication];
          this.resetForm();
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.message
            ? `Failed to create application: ${err.message}`
            : 'Failed to create application';
          this.loading = false;
        },
      });

      return;
    }

    if (this.editingCreatedAt === null) {
      this.error = 'Missing original application metadata.';
      this.loading = false;
      return;
    }

    const updatedApplication: JobApplication = {
      id: this.editingId,
      createdAt: this.editingCreatedAt!,
      ...this.formModel,
    };

    this.service.update(this.editingId, updatedApplication).subscribe({
      next: () => {
        this.applications = this.applications.map((app) =>
          app.id === this.editingId ? updatedApplication : app,
        );
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message
          ? `Failed to update application: ${err.message}`
          : 'Failed to update application';
        this.loading = false;
      },
    });
  }

  resetForm(): void {
    this.formModel = { ...this.formInitialState };
    this.editingId = null;
    this.editingCreatedAt = null;
  }

  ngOnInit(): void {
    this.loadApplications();
  }

  trackById(index: number, item: JobApplication): number {
    return item.id;
  }

  editApplication(application: JobApplication): void {
    this.editingId = application.id;
    this.editingCreatedAt = application.createdAt;

    this.formModel = {
      companyName: application.companyName,
      jobTitle: application.jobTitle,
      status: application.status,
      dateApplied: application.dateApplied ? application.dateApplied.slice(0, 10) : '',
      jobUrl: application.jobUrl ?? '',
      location: application.location ?? '',
      notes: application.notes ?? '',
    };
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteApplication(id: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.loading = true;
      this.error = '';

      this.service.delete(id).subscribe({
        next: () => {
          this.applications = this.applications.filter((app) => app.id !== id);
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.message
            ? `Failed to delete application: ${err.message}`
            : 'Failed to delete application';
          this.loading = false;
        },
      });
    }
  }
}

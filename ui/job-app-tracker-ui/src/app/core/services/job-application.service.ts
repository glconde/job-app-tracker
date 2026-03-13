import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JobApplication } from '../models/job-application.model';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5269/api/jobapplications';

  getAll(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.baseUrl);
  }

  getById(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseUrl}/${id}`);
  }

  create(application: Omit<JobApplication, 'id' | 'createdAt'>): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.baseUrl, application);
  }

  update(id: number, application: JobApplication): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, application);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

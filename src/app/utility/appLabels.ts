import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AppLabelNames {
    constants = {
        dashboard: {
            heading: 'Home',
            assaign: 'Assigned Leads',
            pageHeader: 'Dashboard',
            CreateLead: 'Create Lead',
            ExistingApplications: 'Existing Applications',
            CreateReview: 'Credit Review',
            CheckEligibility: 'Check Eligibility',
            menu: [
              {
                // logo: 'createLeadIMG',
                label: 'CreateLead',
                path: '/choose-customer',
                name: 'person-add',
              },
              {
                // logo: 'ExistingApplicationsIMG',
                label: 'ExistingApplications',
                path: '/existing-applications',
                name: 'insert_drive_file',
              },
              {
                // logo: 'CreateReviewIMG',
                label: 'CreateReview',
                path: '/credit-review',
                name: 'search',
              },
              {
                // logo: 'CreateReviewIMG',
                label: 'CheckEligibility',
                // path: '/check-eligibility',
                name: 'search',
              },
            ],
          }
    }
}
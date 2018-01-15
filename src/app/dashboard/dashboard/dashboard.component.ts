import { Component, ViewEncapsulation, NgModule, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// import { IssueTypesComponent } from '../charts/issue-types.component';
// import { TypesDistributionComponent } from '../charts/types-distribution.component';
// import { ActiveIssuesComponent } from '../charts/active-issues.component';
// import { StatisticsComponent } from '../charts/statistics.component';

import { IssuesModel } from './../../shared/issues.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
// import 'hammerjs';

import { GithubService } from './../../shared/github.service';
import { IssuesProcessor } from './../../shared/issues-processor.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    // providers: [GithubService, IssuesProcessor],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dashboard.template.html'
})
export class DashboardComponent {
    public today: Date = new Date();
    public rangeStart: Date;
    private issues: any;
    private months = 3;
    private data: any;
    private subscription: Subscription;
    private selectedIndex = 0;

    // @HostBinding('attr.id') get get_id() { return 'dashboard'; }
    // @HostBinding('class') get get_class() { return 'dashboard'; }

    constructor(public githubService: GithubService, public issuesProcessor: IssuesProcessor) {
        this.rangeStart = this.issuesProcessor.getMonthsRange(this.months);

        this.subscription = githubService
            .getGithubIssues({pages: 14})
            .map(data => {
                this.data = data;
                return this.issuesProcessor.process(data, this.months);
            })
            .merge(Observable.of(new IssuesModel()))
            .subscribe((data: IssuesModel) => {
                this.issues = data;
            });
    }

    onFilterClick(months) {
        if (this.months !== months) {
            this.months = months;
            this.rangeStart = this.issuesProcessor.getMonthsRange(months);
            this.issues = this.issuesProcessor.process(this.data, months);
            this.filterIssues(this.selectedIndex);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onTabSelect(event) {
        this.filterIssues(event.index);
    }

    filterIssues(index) {
        switch (index) {
            case 0 :
                this.issues = this.issuesProcessor.process(this.data, this.months);
                this.selectedIndex = 0;
                break;
            case 1 :
                const assigned = this.issuesProcessor.flatten(this.data).filter(item => item.assignee ? item.assignee.login === 'ggkrustev' : false);
                this.issues = this.issuesProcessor.process(assigned, this.months);
                this.selectedIndex = 1;
                break;
            case 2 :
                const created = this.issuesProcessor.flatten(this.data).filter(item => item.user.login === 'ggkrustev');
                this.issues = this.issuesProcessor.process(created, this.months);
                this.selectedIndex = 2;
                break;
            default : this.issues = this.issuesProcessor.process(this.data, this.months); ;
        }
    }
}

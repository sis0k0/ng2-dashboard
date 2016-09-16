import { Component, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'issue-types',
    template: `
        <div class="card issue-types">
            <h4 class="card-header">Issue Types</h4>
            <div class="card-block" style="margin: auto; width: 320px">
                <kendo-chart (seriesHover)="onHover($event)">
                    <kendo-chart-series>
                        <kendo-chart-series-item
                            [holeSize]="100"
                            [data]="issues"
                            type="donut"
                            field="value"
                            categoryField="type"
                            [overlay]="false"
                        ></kendo-chart-series-item>
                    </kendo-chart-series>
                </kendo-chart>
                <div class="comp-label chart-label">
                    <strong>{{donutPercent}}</strong>
                    <small>{{donutLabel}}</small>
                </div>
            </div>
        </div>
    `
})
export class IssueTypesComponent {
    public donutPercent: string;
    public donutLabel: string;
    public issues;

    @Input() public set data(data) {
        this.issues = data;
        data.forEach(series =>  {
            if (series.type === 'OTHER') {
                this.setDonutLegend({
                    value: series.value,
                    category: series.type
                });
            }
        })
    };

    public onHover(event) {
        this.setDonutLegend(event);
    }

    private setDonutLegend(series) {
        this.donutPercent = Math.round(series.value * 100) + '%';
        this.donutLabel = series.category;
    }
}
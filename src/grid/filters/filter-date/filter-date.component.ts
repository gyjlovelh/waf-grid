import { Component } from '@angular/core';
import { GridFilterService, FilterOperatorDescriptor } from '../../filters/grid-filter.service';
import { AbstractFilterComponent } from '../abstract-filter.component';

@Component({
    selector: 'waf-filter-date',
    templateUrl: './filter-date.component.html'
})
export class FilterDateComponent extends AbstractFilterComponent {

    constructor(
        protected $filterService: GridFilterService
    ) {
        super($filterService);
    }

    wafDateSearch(code: string) {
        this.onChange(code, FilterOperatorDescriptor.equal);
    }

    clear() {
        this.value = null;
        this.wafDateSearch(this.value);
    }
}

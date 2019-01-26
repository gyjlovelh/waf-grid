import { Component } from '@angular/core';
import { GridFilterService, FilterOperatorDescriptor } from 'src/grid/filters/grid-filter.service';
import { AbstractFilterComponent } from '../abstract-filter.component';

@Component({
    selector: 'waf-filter-string',
    templateUrl: './filter-string.component.html'
})
export class FilterStringComponent extends AbstractFilterComponent {
    value: string;
    constructor(
        protected $filterService: GridFilterService
    ) {
        super($filterService);
    }

    wafInputSearch() {
        this.onChange(this.value, FilterOperatorDescriptor.contains);
    }

    clear() {
        this.value = null;
        this.wafInputSearch();
    }
}

import { Component } from '@angular/core';
import { GridFilterService, FilterOperatorDescriptor } from '../../filters/grid-filter.service';
import { AbstractFilterComponent } from '../abstract-filter.component';

@Component({
    selector: 'waf-filter-dropdown',
    templateUrl: './filter-dropdown.component.html'
})
export class FilterDropdownComponent extends AbstractFilterComponent {

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

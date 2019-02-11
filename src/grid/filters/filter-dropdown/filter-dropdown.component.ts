import { Component, Input } from '@angular/core';
import { GridFilterService, FilterOperatorDescriptor } from '../../filters/grid-filter.service';
import { AbstractFilterComponent } from '../abstract-filter.component';

@Component({
    selector: 'waf-filter-dropdown',
    templateUrl: './filter-dropdown.component.html'
})
export class FilterDropdownComponent extends AbstractFilterComponent {

    @Input() dropdown: any[] = [];

    constructor(
        protected $filterService: GridFilterService
    ) {
        super($filterService);
    }

    wafDateSearch(open: boolean) {
        if (!open) {
            this.onChange(this.value, FilterOperatorDescriptor.in);
        }
    }

    clear() {
        this.value = null;
        this.wafDateSearch(this.value);
    }

}

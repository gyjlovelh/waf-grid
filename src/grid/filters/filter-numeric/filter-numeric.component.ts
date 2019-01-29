import { Component } from '@angular/core';
import { GridFilterService, FilterOperatorDescriptor } from '../../filters/grid-filter.service';
import { AbstractFilterComponent } from '../abstract-filter.component';

@Component({
    selector: 'waf-filter-numeric',
    templateUrl: './filter-numeric.component.html'
})
export class FilterNumericComponent extends AbstractFilterComponent {

    constructor(
        protected $filterService: GridFilterService
    ) {
        super($filterService);
    }

    wafNumericSearch(code: string) {
        this.onChange(code, FilterOperatorDescriptor.equal);
    }

    clear() {
        this.value = null;
        this.wafNumericSearch(this.value);
    }
}

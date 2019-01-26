import { GridFilterService, FilterOperatorDescriptor, FilterDescriptor } from './grid-filter.service';
import { Input } from '@angular/core';


export abstract class AbstractFilterComponent {
    @Input() field: string;
    @Input() filterType: string;

    public value: any;

    private filters: Array<FilterDescriptor> = [];

    constructor(
        protected $filterService: GridFilterService
    ) {
        $filterService.filterChange.subscribe(filters => {
            this.filters = filters;
        });
    }

    public onChange(value: string, operator: FilterOperatorDescriptor) {
        let target = this.filters.find(item => item.field === this.field);
        if (target) {
            target.value = value;
        } else {
            target = {field: this.field, value, operator};
            this.filters.push(target);
        }
        this.$filterService.commitChange(this.filters);
    }

    abstract clear();
}

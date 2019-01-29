import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable()
export class GridFilterService {

    private filterValue = new Subject<Array<FilterDescriptor>>();

    filterChange: Observable<Array<FilterDescriptor>> = this.filterValue.asObservable();

    commitChange(filter: Array<FilterDescriptor>) {
        this.filterValue.next(filter);
    }

}

export class FilterDescriptor {

    field: string;

    value: any;

    operator: FilterOperatorDescriptor;

}

export enum FilterOperatorDescriptor {

    /**
     * 模糊查询
     */
    contains = 'contains',

    /**
     * 全等
     */
    equal = 'eq',

    /**
     * 不等
     */
    notEqual = 'neq',

    /**
     * 包含
     */
    in = 'in',

    /**
     * 小于
     */
    lessThan = 'lt',

    /**
     * 小于等于
     */
    lessThanEqual = 'lte',

    /**
     * 大于
     */
    greaterThan = 'gt',

    /**
     * 大于等于
     */
    greaterThanEqual = 'gte'
}

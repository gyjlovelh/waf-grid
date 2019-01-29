/**
 * {{desc}}
 *
 * &Author: guanyj
 * &Email: 18062791691@163.com
 * &Date: 2019-01-25 10:46:20
 * &LastEditTime: 2019-01-25 14:45:18
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridColumns, GridResultModel } from './grid.model';
import { GridService } from './grid.service';
import { GridFilterService, FilterDescriptor } from './filters/grid-filter.service';

@Component({
    selector: 'waf-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    private filters: FilterDescriptor[] = [];

    private _gridModal = new GridResultModel();
    @Input() set gridModal(model: GridResultModel) {
        if (model) {
            this._gridModal = model;
            this.formatData();
        }
    }

    get gridModal(): GridResultModel {
        return this._gridModal;
    }

    private _columns: GridColumns[] = [];
    @Input() set columns(columns: GridColumns[]) {
        if (columns) {
            this._columns = columns;
            this.formatData();
        }
    }

    get columns(): GridColumns[] {
        return this._columns;
    }

    @Output() dataSourceChange = new EventEmitter<any>();

    isFilterVisable = false;
    isColumnSettingVisable = false;

    constructor(
        private $grid: GridService,
        private $filterService: GridFilterService
    ) {
        this.$filterService.filterChange.subscribe((filters: FilterDescriptor[]) => {
            this.filters = filters;
            this.updateGridViewSource();
        });
    }

    /**
     * 排序
     *
     * &param sort
     */
    wafSortChange(sort: {key: string, value: any}) {
        // TODO: 暴露出去
    }

    wafPageIndexChange(index: number) {
        this.gridModal.current = index;
        this.updateGridViewSource();
    }

    wafPageSizeChange(size: number) {
        this.gridModal.pagesize = size;
        this.gridModal.current = 1;
        this.updateGridViewSource();
    }

    wafFilterChange(v: any) {

    }

    private updateGridViewSource() {
        this.dataSourceChange.emit({
            filters: this.filters,
            sort: [],
            pagesize: this.gridModal.pagesize,
            offset: this.gridModal.offset
        });
    }

    private formatData() {
        if (this.columns && this.columns.length > 0) {
            this.columns.forEach(col => {
                if (col.filterType === 'date') {
                    this.gridModal.data.forEach(item => {
                        if (item[col.field] instanceof Date) {
                            item[col.field] = this.$grid.dateFormat(item[col.field]);
                        }
                    });
                }
            });
        }
    }
}

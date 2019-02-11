/**
 * {{desc}}
 *
 * &Author: guanyj
 * &Email: 18062791691@163.com
 * &Date: 2019-01-25 10:46:20
 * &LastEditTime: 2019-01-25 14:45:18
 */
import { Component, Input, Output, EventEmitter, ContentChildren, ContentChild } from '@angular/core';
import { GridColumns, GridResultModel } from './grid.model';
import { GridService } from './grid.service';
import { GridFilterService, FilterDescriptor } from './filters/grid-filter.service';
import { GridHeaderDirective } from './directive/grid-header.directive';
import { NzTransferComponent } from 'ng-zorro-antd';

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

    get transfers() {
        return this.columns.map(item => ({
            key: item.field,
            title: item.title_zh
        }));
    }

    @Output() dataSourceChange = new EventEmitter<any>();
    @Output() customAction = new EventEmitter<any>();
    @Output() columnChange = new EventEmitter<any>();

    @ContentChild(GridHeaderDirective) leftHeaderTemplate: GridHeaderDirective;

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
        const sortValue = sort.value === 'ascend' ? 'asc' : sort.value === 'descend' ? 'desc' : sort.value;
        this.gridModal.sort = {
            sortField: sort.key,
            sortValue: sortValue
        };
        this.updateGridViewSource();
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

    onTransferChange(source: any) {
        console.log('transferChange', source);
    }

    onColumnsSave(transfer: NzTransferComponent) {
        this.columnChange.emit({
            left: transfer.leftDataSource,
            right: transfer.rightDataSource
        });
    }

    onColumnsReset(transfer: NzTransferComponent) {
        transfer.leftDataSource = transfer.leftDataSource.concat(transfer.rightDataSource);
        transfer.rightDataSource = [];
        // todo
    }

    onDetail(item: any) {
        this.customAction.emit({type: 'detail', data: item});
    }

    onEdit(item: any) {
        this.customAction.emit({type: 'edit', data: item});
    }

    onCopy(item: any) {
        this.customAction.emit({type: 'copy', data: item});
    }

    onDelete(item: any) {
        this.customAction.emit({type: 'delete', data: item});
    }

    private updateGridViewSource() {
        this.dataSourceChange.emit({
            filters: this.filters,
            sort: this.gridModal.sort,
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

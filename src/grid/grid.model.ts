
/**
 * 表格列配置格式
 */
export class GridColumns {

    field: string;

    /** 中英文 */
    title_zh: string;
    title_en: string;

    /** 宽度 */
    width?: number;

    /** 过滤类型 */
    filterType?: string;

    /** 下拉配置 */
    dropdown?: Array<{label: string, value: any}>;

    /** 日期格式化 */
    dateformat?: string;
}

/**
 * 定义接口返回数据格式
 */
export class GridResultModel {
    data: any[] = [];
    total = 0;

    private _pagesize = 20;
    set pagesize(size: number) {
        this._pagesize = size;
        this.offset = (this.current - 1) * size;
    }
    get pagesize(): number {
        return this._pagesize;
    }

    private _current = 1;
    set current(c: number) {
        this._current = c;
        this.offset = (c - 1) * this.pagesize;
    }
    get current(): number {
        return this._current;
    }

    offset = 0;

    sort: {sortField: string, sortValue: any};

    constructor() {}
}

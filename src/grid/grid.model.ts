
/**
 * 表格列配置格式
 */
export class GridColumns {
    field: string;
    title_zh: string;
    title_en: string;
    width?: number;
    filterType?: string;
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

    constructor() {}
}

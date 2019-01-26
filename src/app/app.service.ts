import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GridResultModel, GridColumns } from 'src/grid/grid.model';

@Injectable()
export class AppService {
    dataSource: any[] = [];
    columnsInfo: GridColumns[] = [];

    constructor() {
        for (let i = 0; i < 1000; i++) {
            this.dataSource.push({
                key: i,
                name: 'John Brown', // string
                age: Math.floor(Math.random() * 100), // date
                birthday: new Date(), // date
                sex: 1, // 枚举（下拉框）
                address: 'New York No. 1 Lake Park' // string
            });
        }
        this.columnsInfo = [
            {field: 'name', title_zh: '姓名', title_en: 'Name', width: 200, filterType: 'string'},
            {field: 'age', title_zh: '年龄', title_en: 'Age', width: 200, filterType: 'numeric'},
            {field: 'birthday', title_zh: '生日', title_en: 'Birthday', width: 300, filterType: 'date'},
            {field: 'sex', title_zh: '性别', title_en: 'Sex', filterType: 'dropdown'},
            {field: 'address', title_zh: '地址', title_en: 'Address', width: 500, filterType: 'string'},
        ];
    }

    queryDataSource(pagesize: number, offset: number): Observable<any> {
        const data = this.dataSource.filter((item, index) => index >= offset && index < offset + pagesize);

        return Observable.create(ob => {
            const result = new GridResultModel();
            result.data = data;
            result.total = this.dataSource.length;
            result.pagesize = pagesize;
            result.current = offset / pagesize + 1;
            ob.next({
                grid: result,
                columns: this.columnsInfo
            });
            ob.complete();
        });
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { GridColumns } from '../grid.model';

@Pipe({
    name: 'gridValue'
})
export class ValuePipe implements PipeTransform {

    transform(value: any, column: GridColumns) {
        if (column.filterType === 'dropdown') {
            return column.dropdown.find(item => item.value === value).label;
        } else if (column.filterType === 'date') {
            return format(value, column.dateformat);
        } else if (column.filterType === 'boolean') {
            return value;
        } else {
            return value;
        }
    }

}

export function format(date: string | Date, f: string = 'yyyy-MM-dd hh:mm:ss') {
    if (!Date.prototype['format']) {
        Date.prototype['format'] = function (fmt) {
            const o = {
                'M+': this.getMonth() + 1,                      // 月份
                'd+': this.getDate(),                           // 日
                'h+': this.getHours(),                          // 小时
                'm+': this.getMinutes(),                        // 分
                's+': this.getSeconds(),                        // 秒
                'q+': Math.floor((this.getMonth() + 3) / 3),    // 季度
                'S': this.getMilliseconds()                     // 毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (const k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                }
            }
            return fmt;
        };
    }

    return new Date(date)['format'](f);
}

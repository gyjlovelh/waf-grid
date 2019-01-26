/**
 * {{desc}}
 *
 * @Author: guanyj
 * @Email: 18062791691@163.com
 * @Date: 2019-01-25 10:38:30
 * @LastEditTime: 2019-01-25 10:45:24
 */
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { IconModule } from '@ant-design/icons-angular';
import { GridService } from './grid.service';
import { GridFilterService } from './filters/grid-filter.service';
import { FilterNumericComponent } from './filters/filter-numeric/filter-numeric.component';
import { FilterStringComponent } from './filters/filter-string/filter-string.component';
import { FilterDateComponent } from './filters/filter-date/filter-date.component';
import { FilterDropdownComponent } from './filters/filter-dropdown/filter-dropdown.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        IconModule,
        NgZorroAntdModule
    ],
    declarations: [
        GridComponent,
        FilterNumericComponent,
        FilterStringComponent,
        FilterDateComponent,
        FilterDropdownComponent
    ],
    exports: [
        GridComponent
    ],
    entryComponents: [
        FilterNumericComponent,
        FilterStringComponent,
        FilterDateComponent,
        FilterDropdownComponent
    ],
    providers: [
        GridService,
        GridFilterService
    ]
})
export class GridModule { }

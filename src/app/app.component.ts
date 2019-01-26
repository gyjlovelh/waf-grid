import { Component, OnInit } from '@angular/core';
import { IconService } from '@ant-design/icons-angular';
import { GridResultModel, GridColumns } from 'src/grid/grid.model';
import { AppService } from './app.service';

@Component({
    selector: 'waf-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    data = [];

    columns: GridColumns[] = [];

    model: GridResultModel;

    constructor(private $data: AppService) {
    }

    ngOnInit() {
        this.$data.queryDataSource(20, 0).subscribe(res => {
            this.model = res.grid;
            this.columns = res.columns;
        });
    }

    handleDataSourceChange(evt: any) {
        console.log('handleDataSourceChange', evt);

        this.$data.queryDataSource(evt.pagesize, evt.offset).subscribe(res => {
            this.model = res.grid;
        });
    }
}

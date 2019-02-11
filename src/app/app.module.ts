import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { IconModule } from '@ant-design/icons-angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { GridModule } from 'src/grid/grid.module';
import { CacheModule } from '@jwaf/cache';
import { AppService } from './app.service';
registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        IconModule,
        HttpClientModule,
        NgZorroAntdModule,
        GridModule,
        CacheModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

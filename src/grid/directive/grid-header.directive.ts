import { Directive, TemplateRef } from '@angular/core';


@Directive({
    selector: '[wafGridLeftHeaderTemplate]'
})
export class GridHeaderDirective {

    constructor(
        public template: TemplateRef<any>
    ) {}

}

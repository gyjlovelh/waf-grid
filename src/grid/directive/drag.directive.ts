import { Directive, HostListener, Input, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Directive({
    selector: '[wafDrag]'
})
export class DragDirective {
    /**
     * 初始位置
     */
    private originalX = 0;

    /** 原始宽度 */
    private originalWidth;

    @Input() wafDrag: any;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private el: ElementRef
    ) {}

    @HostListener('click', ['$event'])
    handleClick(event: MouseEvent) {
        // 阻止拖拽触发TH的排序事件
        event.stopPropagation();
    }

    @HostListener('mousedown', ['$event'])
    handleMousedown(evt: MouseEvent) {
        evt.stopPropagation();
        this.el.nativeElement.style.width = '100%';
        this.originalX = evt.pageX;
        this.originalWidth = this.wafDrag.width;
        this.document.addEventListener('mousemove', this.handleMousemove);
        this.document.addEventListener('mouseup', this.handleMouseup);
    }

    private handleMousemove = (event: MouseEvent) => {
        const width = this.originalWidth + event.pageX - this.originalX;
        this.wafDrag.width = Math.max(80, width);
    }

    private handleMouseup = (evt: MouseEvent) => {
        evt.stopPropagation();
        this.el.nativeElement.style.width = '2px';
        this.document.removeEventListener('mousemove', this.handleMousemove);
        this.document.removeEventListener('mouseup', this.handleMouseup);
    }

}

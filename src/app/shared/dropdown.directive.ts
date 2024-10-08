import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true,
})
export class DropdownDirective {
  private isOpen = false;

  @HostListener('click') toggleOpen() {
    const toggle = this.el.nativeElement;
    const menu = this.el.nativeElement.nextElementSibling;

    if (menu) {
      if (this.isOpen) {
        this.renderer.removeClass(menu, 'show');
        this.renderer.removeClass(toggle, 'show');
      } else {
        this.renderer.addClass(menu, 'show');
        this.renderer.addClass(toggle, 'show');
      }
      this.isOpen = !this.isOpen;
    }
  }

  @HostListener('document:click', ['$event']) onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      const toggle = this.el.nativeElement;
      const menu = this.el.nativeElement.nextElementSibling;

      if (menu) {
        this.renderer.removeClass(menu, 'show');
        this.renderer.removeClass(toggle, 'show');
        this.isOpen = false;
      }
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
}

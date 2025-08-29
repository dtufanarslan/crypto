import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-demo',
    templateUrl: './button-demo.component.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonDemo {
    onCheckClick() {
        console.log('Button clicked!');
    }
}

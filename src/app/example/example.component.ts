import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Api } from '../api.service';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    standalone: true,
    imports: [ButtonModule, JsonPipe]
})
export class Example implements OnInit {
    private api = inject(Api);
    data = signal({});

    refresh() {
        this.api.getData().subscribe({
            next: (res) => {
                this.data.set(res)
                console.log(this.data())
            },
            error: (err) => console.error('Error fetching data', err)
        });
    }

    ngOnInit() {
        this.refresh();
    }

    onClick() {
        this.refresh();
    }
}

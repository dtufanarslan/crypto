import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    standalone: true,
    imports: [TableModule, JsonPipe]
})
export class ExampleComponent implements OnInit {
    private api = inject(ApiService);
    data: any = signal({});

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

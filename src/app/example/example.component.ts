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

    callback = {
        next: (res: any) => {
            this.data.set(res);
        },
        error: (err: any) => {
            console.error('Error fetching data', err);
        }
    }

    refresh() {
        this.api.getData().subscribe(this.callback);
    }

    ngOnInit() {
        this.refresh();
    }
}

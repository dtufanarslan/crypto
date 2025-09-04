import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../api.service';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    standalone: true,
    imports: [TableModule, TreeTableModule]
})
export class ExampleComponent implements OnInit {
    private api = inject(ApiService);
    private data: WritableSignal<Array<{ id: number, name: string, data: any }>> = signal([]);
    tableData = computed(() => {
        let newData: Array<any> = [];
        this.data().forEach((value) => {
            const index = newData.findIndex((v) => v.data.name == value.name);
            if (index !== -1) {
                newData[index]['children'].push({ data: { id: value.id, name: JSON.stringify(value.data) } });
            } else {
                newData.push({ data: { id: newData.length + 1, name: value.name }, children: [ {data: { id: value.id, name: JSON.stringify(value.data) } } ] });
            }
        });
        return newData;
    });

    callback = {
        next: (res: Array<any>) => {
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

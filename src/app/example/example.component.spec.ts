import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '../api.service';
import { ExampleComponent } from './example.component';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ExampleComponent', () => {
    let component: ExampleComponent;
    let fixture: ComponentFixture<ExampleComponent>;
    let apiService: jest.Mocked<ApiService>;

    beforeEach(() => {
        apiService = {
            getData: jest.fn(),
        } as unknown as jest.Mocked<ApiService>;

        apiService.getData.mockReturnValue(of([{ id: 1, name: 'Product 1', data: { price: 5, color: 'black' } }]));

        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiService },
                provideZonelessChangeDetection()
            ],
            imports: [ExampleComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ExampleComponent);
        component = fixture.componentInstance;
    });

    it('should render the component', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render table header', () => {
        fixture.detectChanges();
        const thead = fixture.nativeElement.querySelectorAll('th');
        expect(thead.length).toBe(3);
        expect(thead[0].textContent).toBe('Id');
        expect(thead[1].textContent).toBe('Name');
        expect(thead[2].textContent).toBe('Data');
    });

    it('should render table body', () => {
        fixture.detectChanges();
        const tbody = fixture.nativeElement.querySelectorAll('td');
        expect(tbody.length).toBe(3);
        expect(tbody[0].textContent).toBe('1');
        expect(tbody[1].textContent).toBe('Product 1');
        expect(tbody[2].textContent).toBe('{\n  "price": 5,\n  "color": "black"\n}');

        apiService.getData.mockReturnValue(of([{ id: 1, name: 'Product 1', data: { price: 5, color: 'white' } }]));
        component.refresh();
        fixture.detectChanges();
        expect(tbody.length).toBe(3);
        expect(tbody[0].textContent).toBe('1');
        expect(tbody[1].textContent).toBe('Product 1');
        expect(tbody[2].textContent).toBe('{\n  "price": 5,\n  "color": "black"\n}');
    });

    it('should handle callback', async () => {
        fixture.autoDetectChanges();
        component.callback.next([{ id: 1, name: 'Product 1', data: { price: 1, color: 'black' } }])
        await fixture.whenStable();
        const tbody = fixture.nativeElement.querySelectorAll('td');
        expect(tbody.length).toBe(3);
        expect(tbody[0].textContent).toBe('1');
        expect(tbody[1].textContent).toBe('Product 1');
        expect(tbody[2].textContent).toBe('{\n  "price": 1,\n  "color": "black"\n}');

        let spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        component.callback.error('Test');
        expect(spy).toHaveBeenCalled();
    });
});
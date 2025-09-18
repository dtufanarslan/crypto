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
        expect(thead.length).toBe(2);
        expect(thead[0].textContent).toBe('Id');
        expect(thead[1].textContent).toBe('Name');
    });

    it('should render table body', async () => {
        fixture.detectChanges();
        await fixture.whenStable();

        const tbody = fixture.nativeElement.querySelectorAll('td');
        expect(tbody.length).toBe(2); // ← ✅ Da du nur EINE Zeile in mock hast, gibt es 2 TDs (id + name)
        expect(tbody[0].textContent).toContain('1');
        expect(tbody[1].textContent).toContain('Product 1');

        // update mock response
        apiService.getData.mockReturnValue(of([
            { id: 1, name: 'Product 1', data: { price: 5, color: 'white' } }
        ]));

        component.refresh();
        await fixture.whenStable();
        fixture.detectChanges();

        const updatedTbody = fixture.nativeElement.querySelectorAll('td');
        expect(updatedTbody[1].textContent).toContain('Product 1');
    });

    it('should handle callback', async () => {
        component.callback.next([
            { id: 1, name: 'Product 1', data: { price: 1, color: 'black' } }
        ]);

        await fixture.whenStable();
        fixture.detectChanges();

        const tbody = fixture.nativeElement.querySelectorAll('td');
        expect(tbody[0].textContent).toContain('1');
        expect(tbody[1].textContent).toContain('Product 1');

        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        component.callback.error('Test');
        expect(spy).toHaveBeenCalledWith('Error fetching data', 'Test');
        spy.mockRestore();
    });
});

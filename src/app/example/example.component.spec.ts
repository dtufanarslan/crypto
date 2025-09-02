import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Api as ApiService } from '../api.service';
import { Example } from './example.component';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Example', () => {
    let component: Example;
    let fixture: ComponentFixture<Example>;
    let apiService: jest.Mocked<ApiService>;

    beforeEach(() => {
        apiService = {
            getData: jest.fn(),
        } as unknown as jest.Mocked<ApiService>;

        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiService },
                provideZonelessChangeDetection()
            ],
            imports: [Example]
        }).compileComponents();

        fixture = TestBed.createComponent(Example);
        component = fixture.componentInstance;
    });

    it('should render the component', () => {
        apiService.getData.mockReturnValue(of([{ id: 1, name: 'Product 1', data: { price: 5, color: 'black' } }]));
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render table body', () => {
        apiService.getData.mockReturnValue(of([{ id: 1, name: 'Product 1', data: { price: 5, color: 'black' } }]));
        fixture.detectChanges();
        const tbody = fixture.nativeElement.querySelectorAll('td');
        expect(tbody.length).toBe(3);
        expect(tbody[0].textContent).toBe('1');
        expect(tbody[1].textContent).toBe('Product 1');
        expect(tbody[2].textContent).toBe('{\n  "price": 5,\n  "color": "black"\n}');
    });
});
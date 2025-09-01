import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Api as ApiService } from '../api.service';
import { Example } from './example.component';
import { of, throwError } from 'rxjs';

describe('YourComponent', () => {
    let component: Example;
    let fixture: ComponentFixture<Example>;
    let apiService: jest.Mocked<ApiService>;

    beforeEach(() => {
        apiService = {
            getData: jest.fn(),
        } as unknown as jest.Mocked<ApiService>;

        TestBed.configureTestingModule({
            declarations: [Example],
            providers: [
                { provide: ApiService, useValue: apiService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Example);
        component = fixture.componentInstance;
    });

    it('should render the component', () => {
        apiService.getData.mockReturnValue(of([{ id: 1, name: 'Product 1', data: {} }]));
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display header content', () => {
        const headerContent = 'Test Header';
        component.headerContent = headerContent;
        fixture.detectChanges();
        const h1 = fixture.nativeElement.querySelector('h1');
        expect(h1.textContent).toContain(headerContent);
    });

    it('should render table headers correctly', () => {
        apiService.getData.mockReturnValue(of([{ id: 1, name: 'Product 1', data: {} }]));
        fixture.detectChanges();
        const headers = fixture.nativeElement.querySelectorAll('th');
        expect(headers.length).toBe(3);
        expect(headers[0].textContent).toBe('Code');
        expect(headers[1].textContent).toBe('Name');
    });
});
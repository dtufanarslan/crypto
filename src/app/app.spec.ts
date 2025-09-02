import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideZonelessChangeDetection } from '@angular/core';
import { ApiService } from './api.service';

describe('Example', () => {
    let component: App;
    let fixture: ComponentFixture<App>;
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
            imports: [App]
        }).compileComponents();

        fixture = TestBed.createComponent(App);
        component = fixture.componentInstance;
    });

    it('should render the component', () => {
        expect(component).toBeTruthy();
    });
});
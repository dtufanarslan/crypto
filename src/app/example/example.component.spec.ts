import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Example } from './example.component';
import { Api } from '../api.service';
import fetch from 'sync-fetch';

describe('Example', () => {
    let component: Example;
    let fixture: ComponentFixture<Example>;

    const apiMock = {
        getData: jest.fn().mockReturnValue(fetch("/api/example"))
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [Example],
            providers: [
                { provide: Api, useValue: apiMock },
            ]

        });
        fixture = TestBed.createComponent(Example);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('.showMessage', () => {
        it('should show the message', () => {
            expect(apiMock.getData).not.toHaveBeenCalled();
            expect(component.data).toBe({});
            component.refresh();
            expect(apiMock.getData).toHaveBeenCalledTimes(1);
            expect(component.data).toContain('id');
        });
    });
});
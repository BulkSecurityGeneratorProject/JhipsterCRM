/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ActionService } from 'app/entities/action/action.service';
import { IAction, Action } from 'app/shared/model/action.model';

describe('Service Tests', () => {
    describe('Action Service', () => {
        let injector: TestBed;
        let service: ActionService;
        let httpMock: HttpTestingController;
        let elemDefault: IAction;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ActionService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Action(0, currentDate, currentDate, currentDate, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dueDate: currentDate.format(DATE_FORMAT),
                        startDateTime: currentDate.format(DATE_TIME_FORMAT),
                        endDateTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Action', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dueDate: currentDate.format(DATE_FORMAT),
                        startDateTime: currentDate.format(DATE_TIME_FORMAT),
                        endDateTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dueDate: currentDate,
                        startDateTime: currentDate,
                        endDateTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Action(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Action', async () => {
                const returnedFromService = Object.assign(
                    {
                        dueDate: currentDate.format(DATE_FORMAT),
                        startDateTime: currentDate.format(DATE_TIME_FORMAT),
                        endDateTime: currentDate.format(DATE_TIME_FORMAT),
                        notes: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dueDate: currentDate,
                        startDateTime: currentDate,
                        endDateTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Action', async () => {
                const returnedFromService = Object.assign(
                    {
                        dueDate: currentDate.format(DATE_FORMAT),
                        startDateTime: currentDate.format(DATE_TIME_FORMAT),
                        endDateTime: currentDate.format(DATE_TIME_FORMAT),
                        notes: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dueDate: currentDate,
                        startDateTime: currentDate,
                        endDateTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Action', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
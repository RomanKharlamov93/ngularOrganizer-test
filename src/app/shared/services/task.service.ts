import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {Observable} from 'rxjs';

export interface DayTask {
  id?: string;
  title?: string;
  cost?: number;
  location?: string;
  time?: string;
  date?: string;
  note?: string;
}


interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: "root"
})

export class TasksService {
  static url = 'https://myorganizer2.firebaseio.com/tasks';

  constructor(private http: HttpClient) {

  }

  load(date: moment.Moment): Observable<DayTask[]> {
    return this.http
      .get<DayTask[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return [];
        }
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
      }));
  }

  remove(task: DayTask): Observable<void> {
    return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`);
  }

  create(task: DayTask): Observable<DayTask> {
    return this.http.post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map(res => {
        console.log('Response:', res);
        return {...task, id: res.name};
      }));
  }
}

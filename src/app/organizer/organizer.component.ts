import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {DateService} from "../shared/services/date.service";
import {DayTask, TasksService} from "../shared/services/task.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.sass']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup;
  tasks: DayTask[] = [];

  constructor(private dataService: DateService, private taskService: TasksService) {
  }

  ngOnInit() {
    this.dataService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
      console.log('TaskService', this.tasks);
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
    console.log('OnInit', this.tasks);
  }

  taskSubmit() {
    const {title} = this.form.value;

    const task: DayTask = {
      title,
      date: this.dataService.date.value.format('DD-MM-YYYY')
    };

    // tslint:disable-next-line:no-shadowed-variable
    this.taskService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
      console.log(this.tasks.length);
    }, error => console.error(error));
  }

  removeTask(task: DayTask) {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      console.log(task.id);
    }, error => console.error(error));
  }

}

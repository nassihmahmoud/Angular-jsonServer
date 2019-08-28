import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  myTask: Task = {
     label: '',
     completed: false
  }
     tasks: Task[] = [];
     resultatTasks: Task[] = [];

     editForm = false;
     showForm = false;
     searchText = '';
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }resultatTasks

    getTasks() {
      this.taskService.finAll()
       .subscribe(tasks => this.resultatTasks = this.tasks = tasks);
    }

    deleteTask(id){
        this.taskService.delete(id)
        .subscribe(() => {
          this.tasks = this.tasks.filter(task => task.id != id);
        })
    }

    persistask() {
      this.taskService.persist(this.myTask)
      .subscribe((task) => {
        this.tasks = [task, ...this.tasks];
        this.restTask();
        this.showForm = false;
      })
    }

       restTask(){
        this.myTask = {
          label: '',
          completed: false
       };
       }

          toggleCompleted(task) {
             this.taskService.completed(task.id, task.completed)
              .subscribe(() => {
                task.completed = !task.completed;
              });
          }
       editTask(task) {
         this.myTask = task;
         this.editForm = true;
       }
       updatetask() {
         this.taskService.update(this.myTask)
         .subscribe(task => {
          this.restTask();
          this.editForm = false;
         });
        }
         searchTasks() {
              this.resultatTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))
          }


       }


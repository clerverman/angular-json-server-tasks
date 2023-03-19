import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks?: Task[] | null;
  resultTasks?: Task[] | null;
  myTask: Task = {
    label : '',
    completed : false,
  }
  editTaskBtn: boolean = false ;
  showFormDiv: boolean = false;
  searchText: string = '' ;
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks()
  {
    this.taskService.findAll()
      .subscribe( data => {
        this.tasks = this.resultTasks = data ;
      } );
  }

  deleteTask(id: number)
  {
    this.taskService.delete(id)
      .subscribe( () => {
        this.tasks =  this.resultTasks  = this.tasks?.filter( task => task.id !== id)
      });
  }

  addTask()
  {
    this.taskService.persist(this.myTask)
      .subscribe( (task)=>{
        this.tasks = this.resultTasks = [task,...this.tasks!];
        this.showFormDiv = false ;
      })
  }

  editTask(task: Task)
  {
    // formulaire est binded avec myTask directement
    this.myTask = task ;
    this.editTaskBtn = true
  }

  resetTask()
  {
    this.myTask = {
      label: '',
      completed : false
    }
  }

  toggleCompleted(task: Task)
  {
    return this.taskService.completed(task.id!,task.completed)
      .subscribe( ()=> {
        task.completed = !task.completed
      })
  }

  updateTask() {
    return this.taskService.update(this.myTask)
      .subscribe((task)=>{
        this.resetTask();
        this.editTaskBtn = false;
        this.showFormDiv = false;
        //  this.editTaskBtn =  this.showFormDiv = false
      })
  }

  showForm(){
    this.showFormDiv = !this.showFormDiv ;
  }

  searchTask()
  {
    // pour ne pas écraser les données tasks , les memes données sont en tasks
    this.resultTasks = this.tasks?.filter((t) => t.label.toLocaleLowerCase().includes(this.searchText));
  }
}

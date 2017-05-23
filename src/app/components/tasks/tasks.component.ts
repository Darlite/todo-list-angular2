import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any;

  constructor(
    private firebaseService: FirebaseService,
     private router: Router
  ) { }

  ngOnInit() {
    this.firebaseService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onEditState(task) {
    task.completed = !task.completed;
    this.firebaseService.updateTask(task.$key, task);
  }

}

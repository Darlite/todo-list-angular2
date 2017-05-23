import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title: any;
  text: any;
  createdBy: any;
  date: any;
  image: any;
  completed: boolean;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
    let task = {
      title: this.title,
      text: this.text,
      date: this.date,
      createdBy: this.firebaseService.getUserName(),
      completed: false
    };

    this.firebaseService.addTask(task);
    this.router.navigate(['tasks']);
  }
  

}

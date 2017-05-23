import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  id;
  title;
  text;
  createdBy;
  date;
  image;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getTaskDetails(this.id).subscribe(task => {
      this.title = task.title;
      this.text = task.text;
      this.date = task.date;
    });
  }

  onEditSubmit() {
    let task = {
      title: this.title,
      text: this.text,
      date: this.date,
    }

    this.firebaseService.updateTask(this.id, task);
    this.router.navigate(['/tasks']);
  }

}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
  tasks: FirebaseListObservable<any[]>;
  task: FirebaseObjectObservable<any>;
  folder: any;

  constructor(private db: AngularFireDatabase) {
    this.folder = 'taskImages';
    this.tasks = this.db.list('/tasks') as FirebaseListObservable<Task[]>;
  }

  getTasks() {
    return this.tasks;
  }

  getTaskDetails(id) {
    this.task = this.db.object('/tasks/' + id) as FirebaseObjectObservable<Task>;
    return this.task;
  }

  addTask(task) {
    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        task.image = selectedFile.name;
        task.path = path;
        return this.tasks.push(task);
      });
    }
  }
  
  updateTask(id, task) {
    return this.tasks.update(id, task);
  }
  
  deleteTask(id) {
    return this.tasks.remove(id);
  }

  getUserName() {
    let user = firebase.auth().currentUser;
    return user.displayName;
  }
}

interface Task {
  $key?: string;
  title?: string;
  image?: string;
  createdBy?: string;
  text?: string;
  date?: string;
}

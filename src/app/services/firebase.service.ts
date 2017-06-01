import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
  tasks: FirebaseListObservable<any[]>;
  task: FirebaseObjectObservable<any>;
  images: FirebaseListObservable<any[]>;
  folder: any;

  constructor(private db: AngularFireDatabase) {
    this.folder = 'taskImages';
    this.tasks = this.db.list('/tasks') as FirebaseListObservable<Task[]>;
    this.images = this.db.list('/images') as FirebaseListObservable<Task[]>;
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
    let selectedFile = (<HTMLInputElement>document.getElementById('image')).files[0];
    if (selectedFile !== undefined) {
      this.uploadImage(task, selectedFile);
    } else {
      this.tasks.push(task);
    }
  }

  uploadImage(task, selectedFile) {
    let storageRef = firebase.storage().ref();
    let path = `/${this.folder}/${selectedFile.name}`;
    let iRef = storageRef.child(path);
    iRef.put(selectedFile).then((snapshot) => {
      task.image = selectedFile.name;
      task.path = path;
      return this.tasks.push(task);
    });
  }

  updateImage(id, task) {
    if (<HTMLInputElement>document.getElementById('image') !== null) {
      let selectedFile = (<HTMLInputElement>document.getElementById('image')).files[0];
      if (selectedFile !== undefined) {
        let storageRef = firebase.storage().ref();
        let path = `/${this.folder}/${selectedFile.name}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          task.image = selectedFile.name;
          task.path = path;
          return this.tasks.update(id, task);
        });
      }
    }
  }

  updateTask(id, task) {
    this.updateImage(id, task);
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

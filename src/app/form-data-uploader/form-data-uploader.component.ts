import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as firebase from 'firebase'

@Component({
  selector: 'app-form-data-uploader',
  templateUrl: './form-data-uploader.component.html',
  styleUrls: ['./form-data-uploader.component.css']
})
export class FormDataUploaderComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  files = null;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [''],
      avatar: null
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;
      console.log(this.files)
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('avatar', this.form.get('avatar').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)

    this.upload()

    setTimeout(() => {
      // FormData cannot be inspected (see "Key difference"), hence no need to log it here
      this.loading = false;
    }, 1000);
  }

  upload() {
    Object.entries(this.files).forEach(
      ([key, value]) => {
        let file = this.files[key]
        let metaData = { 'contentType': file.type }
        let storageRef: firebase.storage.Reference = firebase.storage().ref('/images/' + file.name)
        let uploadTask = storageRef.put(file, metaData)
        uploadTask.on('state_changed', function (snapshot) {

        }, function (error) {
          console.log("error")
        }, function () {
          let downloadURL = uploadTask.snapshot.downloadURL;
          console.log(downloadURL)
        });
      }
    );
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
  }

  ngOnInit() {
  }

}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as firebase from 'firebase/app'

@Component({
  selector: 'app-form-data-uploader',
  templateUrl: './form-data-uploader.component.html',
  styleUrls: ['./form-data-uploader.component.css']
})
export class FormDataUploaderComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  file = null;

  @ViewChild('fileInput') fileInput: ElementRef;
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
      this.file = event.target.files[0];
      console.log(event.target.files)
      this.form.get('avatar').setValue(this.file);
      // console.log(file.name)
      // console.log(file)
      // console.log(file.valueOf)
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('name', this.form.get('name').value);
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
      alert('done!');
      this.loading = false;
    }, 1000);
  }

  upload() {
    var storageRef = firebase.storage().ref('/images/' + this.file.name);
    var uploadTask = storageRef.put(this.file)

    uploadTask.on('state_changed', function (snapshot) {

    }, function (error) {
    }, function () {
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL)
    });
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userDetails:any;

  editProfile:FormGroup;

  isEditProfile:boolean=false;

  constructor(private fb:FormBuilder, private edit:DatabaseService){

    this.editProfile=fb.group({
      editProfileUsername:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{3,15}$")]],
      editProfileEmail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$")]]
    });


    this.edit.sendEditProfile().subscribe(x=>{
      this.userDetails=x;
      console.log(this.userDetails);
    });
  }


  editProfileDetails(editDetails:any){

    this.edit.editProfileDetails(editDetails);

    window.location.reload();
  }

  showEditprofile(){
    this.isEditProfile=true;
  }

  close(){
    this.isEditProfile=false;
  }
}

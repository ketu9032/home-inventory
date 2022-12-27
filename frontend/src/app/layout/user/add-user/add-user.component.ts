import { AuthService } from './../../../auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserData } from 'src/app/models/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    formGroup: FormGroup;

    isLoggedInUserIsOwner: boolean = false;
    isShowLoader: boolean = false;
    isUserNameExist: boolean = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IUserData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddUserComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,

        private userService: UserService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.initializeForm();
        if (this.data && this.data.id) {
            this.fillForm();
        }
    }

    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userName: ['', Validators.required],
            mobileNumber: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
        })
    }

    saveUser(): void {
        const { userName, password, mobileNumber,  email } =
            this.formGroup.value;
        this.isShowLoader = true;
        this.userService
            .addUser({
                userName,
                password,
                mobileNumber,
                email
            })
            .subscribe(
                (response) => {
                    this.snackBar.open('User saved successfully', 'OK', {
                        duration: 3000
                    });
                    this.isShowLoader = false;
                    this.dialogRef.close(true);
                },
                (error) => {
                    this.isShowLoader = false;
                    this.snackBar.open(
                        (error.error && error.error.message) || error.message,
                        'Ok',
                        {
                            duration: 3000
                        }
                    );
                },
                () => { }
            );
    }

    updateUser(): void {
        const { userName, password, mobileNumber,  email} =
            this.formGroup.value;
        this.isShowLoader = true;
        this.userService
            .editUser({
                id: this.data.id,
                userName,
                password,
                mobileNumber,
                email
            })
            .subscribe(
                (response) => {
                    this.snackBar.open('User updated successfully', 'OK', {
                        duration: 3000
                    });
                    this.isShowLoader = false;
                    this.dialogRef.close(true);
                },
                (error) => {
                    this.isShowLoader = false;
                    this.snackBar.open(
                        (error.error && error.error.message) || error.message,
                        'Ok',
                        {
                            duration: 3000
                        }
                    );
                },
                () => { }
            );
    }

    onSubmit() {
        if (this.data && this.data.id) {
            this.updateUser();
        } else {
            this.saveUser();
        }
    }

    fillForm() {
        this.formGroup.patchValue({
            userName:this.data.user_name,
            password: this.data.password,
            mobileNumber: this.data.mobile_number,
            email: this.data.email
        });

    }

}

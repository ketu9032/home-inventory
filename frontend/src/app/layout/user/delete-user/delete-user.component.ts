import { AuthService } from '../../../auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
    formGroup: FormGroup;
    isLoggedInUserIsOwner: boolean = false;
    isShowLoader: boolean = false;
    isUserNameExist: boolean = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<DeleteUserComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,

        private userService: UserService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {

    }
    removeUser(): void {
        let a = this.data;
        let id: number = +a;

        this.userService.removeUser(id).subscribe(
            (response) => {
                this.dialogRef.close({ data: true });
                this.snackBar.open('Cdf deleted successfully', 'OK', {
                    duration: 3000
                });
            },
            (error) => {
                this.snackBar.open(error.error.message || error.message, 'Ok', {
                    duration: 3000
                });
            },
            () => { }
        );
    }

    onDismiss(): void {
        this.dialogRef.close({ data: false });
    }





}

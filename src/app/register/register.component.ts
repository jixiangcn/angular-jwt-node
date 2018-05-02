import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../classes/user';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    user: User = {
        name: 'Jack',
        password: '12345678'
    };

    response: any = {};
    localStorage: any;

    constructor(private http: HttpClient) {
        if (!localStorage) {
            throw new Error('Current browser does not support Local Storage');
        }
        this.localStorage = localStorage;
    }

    ngOnInit() {
    }

    submitRegisterData(user: User): void {
        this.http.post("http://localhost:8081/register", user)
            .subscribe(data => {
                this.response = data;
                this.localStorage['token'] = data['token'];
            }, error => {
                this.response = error;
            });
    }
}

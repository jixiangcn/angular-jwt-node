import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User = {
        name: 'Jack',
        password: '12345678'
    };

    response: any = {};

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
    }

    submitSignInData(user: User): void {
        this.http.post("http://localhost:8081/login", user)
            .subscribe(data => {
                this.response = data;
            }, error => {
                this.response = error;
            });
    }

}

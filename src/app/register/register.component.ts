import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {HttpClient} from '@angular/common/http';

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

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
    }

    submitRegisterData(user: User): void {
        this.http.post("http://localhost:8081/register", user)
            .subscribe(data => {
                this.response = data;
            }, error => {
                this.response = error;
            });
    }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
    styleUrls: ['./access.component.css']
})

export class AccessComponent implements OnInit {

    result: any;
    localStorage: any;
    httpOptions: any;

    constructor(private http: HttpClient) {
        if (!localStorage) {
            throw new Error('Current browser does not support Local Storage');
        }
        this.localStorage = localStorage;
    }

    ngOnInit() {
        this.httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.localStorage['token']
            }
        };
    }

    loadData(): void {
        this.http.get('http://localhost:8081/me', this.httpOptions)
            .subscribe(data => {
                this.result = data;
            }, error => {
                this.result = error;
            });
    }

}

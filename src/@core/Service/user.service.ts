import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { api } from '../../API/api';
import { User } from '../Models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${api.apiUrl}/auth/`);
    }

    getById(id: number) {
        return this.http.get<User>(`${api.apiUrl}/auth/userId/${id}`);
    }
}
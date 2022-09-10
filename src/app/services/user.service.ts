import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl = 'http://localhost:8080/users';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getDepartments(): Observable<Department[]> {
    const url = `${this.apiUrl}/departments`;
    return this.http.get<Department[]>(url);
  }
  createUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.apiUrl, user, this.httpOptions);
  }
  updateUser(user: User): Observable<User> {
    console.log(user.department);
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions);
  }
  deleteUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.delete<any>(url);
  }

  checkUser(username: string): Observable<boolean> {
    const url = `${this.apiUrl}/check/${username}`;
    return this.http.get<boolean>(url);
  }
}

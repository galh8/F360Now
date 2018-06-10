import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user.model';

@Injectable()
export class UserService {
    readonly rootUrl = 'http://grigale.grigale.com/fitness360user_app/';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const postData = new FormData();

    postData.append('first_name', user.FirstName);
    postData.append('last_name', user.LastName);
    postData.append('email', user.Email);
    postData.append('password', user.Password);
    postData.append('phone_number', user.PhoneNumber);
    postData.append('birthdate', user.Birthday);
    postData.append('institution', user.Institution);
    postData.append('starting_year', user.Starting_year);
    postData.append('is_therapist', '1');

    return this.http.post(this.rootUrl + 'register.php', postData);
  }

  loginUser(email: string, password: string) {
    const postData = new FormData();
    postData.append('email', email);
    postData.append('password', password);
    // postData.append('is_therapist','true');

    return this.http.post(this.rootUrl + 'login.php', postData);
  }

  getInfo(email: string) {
    const postData = new FormData();
    console.log(email);
    postData.append('therapist_email', email);

    return this.http.post(this.rootUrl + 'get_therapist_info.php', postData);
  }

  getNewPatients(email: string) {
    const postData = new FormData();
    postData.append('therapist_email', email);

    return this.http.post(this.rootUrl + 'get_therapist_requests.php', postData);
  }

  getAllPatients(email: string) {
    const postData = new FormData();
    postData.append('therapist_email', email);

    return this.http.post(this.rootUrl + 'get_patients_details_by_therapist.php', postData);
  }

  getPatientActivity(email: string) {
    const postData = new FormData();
    postData.append('patient_email', email);

    return this.http.post(this.rootUrl + 'get_patient_activities.php', postData);
  }

  getPatientScales(email: string) {
    const postData = new FormData();
    postData.append('patient_email', email);

    return this.http.post(this.rootUrl + 'get_patient_scales.php', postData);
  }

  accecptFollowingRequset(therapistEmail, patientEmail) {
    const postData = new FormData();
    postData.append('therapist_email', therapistEmail);
    postData.append('patient_email', patientEmail);

    return this.http.post(this.rootUrl + 'accept_following_requests.php', postData);
  }

  deletePatient(therapistEmail, patientEmail) {
    const postData = new FormData();
    postData.append('therapist_email', therapistEmail);
    postData.append('patient_email', patientEmail);

    return this.http.post(this.rootUrl + 'delete_patient.php', postData);
  }

  deleteFollowingRequset(therapistEmail, patientEmail) {
    const postData = new FormData();
    postData.append('therapist_email', therapistEmail);
    postData.append('patient_email', patientEmail);

    return this.http.post(this.rootUrl + 'delete_request.php', postData);

  }

  getCaloriesFromPic(patient_email, start_date, last_date) {
    const postData = new FormData();
    postData.append('patient_email', patient_email);
    postData.append('start_date', start_date);
    postData.append('last_date', last_date);

    return this.http.post(this.rootUrl + 'get_calories_from_images.php', postData);
  }

  getGeneralCalories(patient_email, start_date, last_date) {
    const postData = new FormData();
    postData.append('patient_email', patient_email);
    postData.append('start_date', start_date);
    postData.append('last_date', last_date);

    return this.http.post(this.rootUrl + 'get_calories_from_images.php', postData);
  }


}

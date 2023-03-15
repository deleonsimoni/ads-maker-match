import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(
    private http: HttpClient
  ) { }

  getAudiencia() {
    return this.http.get(`https://apis-uat.g.globo/innovationday/audience?channel=GGP1&weekday=1`);
  }

  getCusto() {
    return this.http.get(`https://apis-uat.g.globo/innovationday/hourly-costs?channel=GGP1`);
  }

  getGrade() {
    return this.http.get(`https://apis-uat.g.globo/innovationday/slots?channel=GGP1&date=2023-03-13`);
  }

  getCanais() {
    return this.http.get(`https://apis-uat.g.globo/innovationday/channels`);
  }

}

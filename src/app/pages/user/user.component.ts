import { Component, OnInit } from "@angular/core";
import { ApisService } from "src/app/services/apis.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {

  custos;
  canais;
  grade;
  audiencia;

  constructor(
    private apiService: ApisService,
  ) { }

  ngOnInit() {

    this.callAPI();
    this.match();

  }

  time2Seconds(time) {
    let resposta = time.split(":");
    return resposta[0] * 3600 + resposta[1] * 60 + resposta[2];
  }

  match() {

    setTimeout(function () {

      let budget;
      let targetAudience;
      let keyWords;

      let timesByBudget = this.custos.filter(e => e.value <= budget);

      timesByBudget.map(times => {
        times.inicio = this.time2Seconds(times.time);
        let tempoFim = times.time.split(":")[0] + ":59:59";
        times.fim = this.time2Seconds(tempoFim);
      })


      let gradesByTime = this.grade.filter(e => this.time2Seconds(e.startTime) >= times.timeInicio && this.time2Seconds(e.startTime) <= times.timeFim);

    }, 1000);

  }

  callAPI() {

    this.apiService.getCanais().subscribe((res: any) => {
      this.canais = res;
      this.apiService.getCusto().subscribe((res: any) => {
        this.custos = res;
        this.apiService.getGrade().subscribe((res: any) => {
          this.grade = res;
          this.apiService.getAudiencia().subscribe((res: any) => {
            this.audiencia = res;
          }, err => {
          });
        }, err => {
        });
      }, err => {
      });
    }, err => {
    });





  }
}

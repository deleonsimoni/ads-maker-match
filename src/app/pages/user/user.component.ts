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
    // this.match();
  }

  callAPI() {
    let budget = 60000;
    let seconds = 10; // Quantidade de segundos da duração do anúncio a ser exibido
    let targetAudience; // Público alvo do anúncio para ordenar os 
    let keyWords;

    this.apiService.getCanais().subscribe((res: any) => {
      this.canais = res;
      this.apiService.getCusto().subscribe((res: any) => {
        this.custos = res;
        this.apiService.getGrade().subscribe((res: any) => {
          this.grade = res;
          this.apiService.getAudiencia().subscribe((res: any) => {
            this.audiencia = res;

            console.log("Grade: ", this.grade[0])
            console.log("Custos: ", this.custos[0])

            let timesByBudget = this.custos.filter(e => e.value * seconds <= budget);
            let times = timesByBudget.map(e => e.time.split(":")[0]);
            console.log("Times: ", times);
            let gradesByTime = this.grade.filter(e => times.includes(e.startTime.split(":")[0]));
            console.log(gradesByTime);
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

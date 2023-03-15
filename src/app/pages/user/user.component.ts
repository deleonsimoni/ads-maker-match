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

      let budget;
      let seconds; // Quantidade de segundos da duração do anúncio a ser exibido
      let targetAudience; // Público alvo do anúncio para ordenar os 
      let keyWords;

      let timesByBudget = this.custos.filter(e => e.value <= budget);
      let times = timesByBudget.map(e => e.time.split(":")[0]);
      let gradesByTime = this.grade.filter(e => times.includes(e.startTime.split(":")));
      console.log(gradesByTime);

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

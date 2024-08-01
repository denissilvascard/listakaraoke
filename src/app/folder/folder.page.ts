import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HEROES} from "../mock-heroes";
import {Hero} from "../hero";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  buscaNome: string = '';


  constructor() {}
  items = [];
  itemsConsulta = [];
  heroes = HEROES;
  selectedHero?: Hero;

  ngOnInit() {
    this.generateItems();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  private generateItems() {
    const count = this.heroes.length + 1;
    // for (let i = 0; i < 50; i++) {
    //   // this.heroes[i].musica = (this.heroes[i].musica.length > 10 ? this.heroes[i].musica.substr(1, 10) : this.heroes[i].musica);
    //   this.items.push(this.heroes[i]);
    // }
    this.items = this.heroes;
    this.items.sort((a,b) => a.musica.localeCompare(b.musica));
    // this.consultarMusica();

  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


  // consultarMusica(){
  //       var index = this.items.findIndex(obj => obj.musica === "Azul");
  //       this.itemsConsulta.push(this.heroes[index]);
  // }
  filtrarPessoas(): Hero[] {

    if (!this.buscaNome) {
      return this.items;
    }

    const buscaNomeLower = this.buscaNome.toLowerCase();
    return this.items.filter(pessoa =>
      pessoa.musica.toLowerCase().includes(buscaNomeLower)
    );
  }

}

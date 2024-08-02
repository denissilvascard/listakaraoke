import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HEROES} from "../mock-heroes";
import {Hero} from "../hero";

import {FormBuilder} from "@angular/forms";
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  buscaNome: string = '';
  teste;


  constructor() {}
  items = [];
  heroes = [];
  itemsPage: any = [];
  private offset: number = 20;
  private index: number = 0;

  ngOnInit() {
    this.teste = HEROES.length;
    console.log("&&&& ",HEROES[1].musica);
    this.generateItems();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if(this.folder=='Lista'){
      this.folder = "Lista de Musíca"
    }
  }

  // private generateItems() {
  //
  //   this.items = this.heroes;
  //   this.items.sort((a,b) => a.musica.localeCompare(b.musica));
  //
  // }


  filtrarPessoas(): Hero[] {

    if (!this.buscaNome) {
      return this.items;
    }
    // const buscaNomeLower = this.buscaNome.toLowerCase();
    // return this.items.filter(musica =>
    //   musica.artista.toLowerCase().includes(buscaNomeLower)
    // );
    let itemsMusica = [];
    let itemsArtista = [];
    let itemsGeral = [];

    const buscaNomeLower = this.buscaNome.toLowerCase();
    itemsMusica = HEROES.sort((a,b) => a.musica.localeCompare(b.musica)).filter(musica =>
      musica.musica.toLowerCase().includes(buscaNomeLower)
    );

    itemsArtista = HEROES.sort((a,b) => a.musica.localeCompare(b.musica)).filter(musica =>
      musica.artista.toLowerCase().includes(buscaNomeLower)
    );

    itemsMusica.forEach(m => {
      console.log(m)
      itemsGeral.push(m)
    });

    itemsArtista.forEach(a => {
      itemsGeral.push(a)
    });

    return itemsGeral;
  }

  private generateItems() {
    // const count = HEROES.length + 1;
    // for (let i = 0; i < 20; i++) {
    //   this.items.push(HEROES[count+i]);
    // }

    // this.items.sort((a,b) => a.musica.localeCompare(b.musica));
    let tot = this.offset+this.index;
    this.items = HEROES.sort((a,b) => a.musica.localeCompare(b.musica)).splice(this.index, tot);
    this.index +=this.offset;

  }


//   onIonInfinite(ev) {
// console.log("##### ",this.index)
//
//
//         let news = HEROES.splice(this.index, this.offset+this.index);
//         this.index +=this.offset;
//
//       news.forEach(m => {
//
//         this.items.push(m);
//       });
//
//
//
//
//
//
//     setTimeout(() => {
//       (ev as InfiniteScrollCustomEvent).target.complete();
//     }, 500);
//   }

  onIonInfinite(ev) {
    // this.generateItems();

        let news = HEROES.splice(this.index, this.offset+this.index);
        this.index +=this.offset;

      news.forEach(m => {

        this.items.push(m);
      });

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1500);
  }
}

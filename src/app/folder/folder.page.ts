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
  campoPesquisa;
  teste;
  totalRegistros=0;


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
 filtr(){
   this.buscaNome = this.campoPesquisa;
   this.removeAcento (this.buscaNome);
    this.filtrarPessoas();
 }

 clearPesdquisa(){
    if(this.campoPesquisa.length==0){
      this.buscaNome ='';
      this.generateItems();
    }
 }
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

    const buscaNomeLower = this.buscaNome.toLowerCase().trim();
    itemsMusica = HEROES.sort((a,b) => a.musica.localeCompare(b.musica)).filter(musica =>
      this.removeAcento(musica.musica.toLowerCase()).includes(this.removeAcento(buscaNomeLower))
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
    this.totalRegistros = itemsGeral.length;
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

    this.totalRegistros = HEROES.length;
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




  removeAcento (text)  {
    // var textoOriginal = text;
    // var textoSemAcento = textoOriginal.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    var map = { "â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A", "ê": "e", "Ê": "E", "è": "e", "È": "E", "é": "e", "É": "E", "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I", "õ": "o", "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O", "ü": "u", "Ü": "U", "û": "u", "Û": "U", "ú": "u", "Ú": "U", "ù": "u", "Ù": "U", "ç": "c", "Ç": "C" };

    return text.replace(/[\W\[\] ]/g, function (a) { return map[a] || a }).toLowerCase()

    // return text;
  }



}

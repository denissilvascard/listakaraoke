import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HEROES} from "../mock-heroes";
import {Hero} from "../hero";

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
  heroes = HEROES;


  ngOnInit() {
    this.generateItems();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if(this.folder=='Lista'){
      this.folder = "Lista de Musíca"
    }
  }

  private generateItems() {

    this.items = this.heroes;
    this.items.sort((a,b) => a.musica.localeCompare(b.musica));

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

    const buscaNomeLower = this.buscaNome.toLowerCase();
    itemsMusica = this.heroes.filter(musica =>
      musica.musica.toLowerCase().includes(buscaNomeLower)
    );

    itemsArtista = this.heroes.filter(musica =>
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

}

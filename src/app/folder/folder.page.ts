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
  itemsConsulta = [];
  heroes = HEROES;
  selectedHero?: Hero;

  ngOnInit() {
    this.generateItems();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  private generateItems() {

    this.items = this.heroes;
    this.items.sort((a,b) => a.musica.localeCompare(b.musica));

  }




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

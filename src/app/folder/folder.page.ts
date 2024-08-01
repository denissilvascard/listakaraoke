import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HEROES} from "../mock-heroes";
import {Hero} from "../hero";
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}
  items = [];
  heroes = HEROES;
  selectedHero?: Hero;

  ngOnInit() {
    this.generateItems();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  private generateItems() {
    const count = this.heroes.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(this.heroes[i]);
    }

    this.items.sort((a,b) => a.musica.localeCompare(b.musica));

  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


}

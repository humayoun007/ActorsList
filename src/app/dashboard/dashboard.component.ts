import { Component, OnInit } from '@angular/core';
import { Hero } from './../hero';
import { HeroService } from '../hero.service';
import { Actor } from '../actor';
import { ActorService } from './../actor.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //heroes: Hero[] = [];
  actors:Actor[] = [];
  constructor(private actorService:ActorService) { }

  ngOnInit() {
    //this.getHeroes();
    this.getActors();
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //     .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  // }

  getActors(): void {
    this.actorService.getActors()
      .subscribe(actors => this.actors = actors.slice(1, 5));
  }



}

import { Component, OnInit } from '@angular/core';
import { ActorService } from './../actor.services';
import { Actor } from '../actor';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  //actors:ACTORS;
  actors: Actor[];

  constructor(private actorService: ActorService) { }

  ngOnInit() {
    this.getActors();
  }

  getActors(): void {
    this.actorService.getActors()
    .subscribe(actors => this.actors = actors);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.actorService.addActor({ name } as Actor)
      .subscribe(actor => {
        this.actors.push(actor);
      });
  }

  delete(actor: Actor): void {
    this.actors = this.actors.filter(a => a !== actor);
    this.actorService.deleteActor(actor).subscribe();
  }

}
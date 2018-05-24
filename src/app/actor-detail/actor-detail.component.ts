

import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Actor } from './../actor';
import { ActorService } from './../actor.services';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: [ './actor-detail.component.css' ]
})
export class ActorDetailComponent implements OnInit {
  @Input() actor: Actor;

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getActor();
  }

  getActor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.actorService.getActor(id)
      .subscribe(actor => this.actor = actor);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.actorService.updateActor(this.actor)
      .subscribe(() => this.goBack());
  }
}

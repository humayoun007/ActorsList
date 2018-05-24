
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Actor } from '../actor';
import { ActorService } from './../actor.services';



@Component({
  selector: 'app-actor-search',
  templateUrl: './actor-search.component.html',
  styleUrls: [ './actor-search.component.css' ]
})
export class ActorSearchComponent implements OnInit {
  actors$: Observable<Actor[]>;
  private searchTerms = new Subject<string>();

  constructor(private actorService: ActorService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.actors$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.actorService.searchActors(term)),
    );
  }
}



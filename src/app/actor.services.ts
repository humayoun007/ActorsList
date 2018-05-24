import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Actor } from './actor';
import { MessageService } from "./message.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


@Injectable({ providedIn: 'root' })
export class ActorService {

  private actorsUrl = 'api/actors';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET actors from the server */
  getActors (): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.actorsUrl)
      .pipe(
        tap(actors => this.log(`fetched actors`)),
        catchError(this.handleError('getActors', []))
      );
  }

  /** GET actor by id. Return `undefined` when id not found */
  getActorNo404<Data>(id: number): Observable<Actor> {
    const url = `${this.actorsUrl}/?id=${id}`;
    return this.http.get<Actor[]>(url)
      .pipe(
        map(actors => actors[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} actor id=${id}`);
        }),
        catchError(this.handleError<Actor>(`getActor id=${id}`))
      );
  }

  /** GET actor by id. Will 404 if id not found */
  getActor(id: number): Observable<Actor> {
    const url = `${this.actorsUrl}/${id}`;
    return this.http.get<Actor>(url).pipe(
      tap(_ => this.log(`fetched actor id=${id}`)),
      catchError(this.handleError<Actor>(`getActor id=${id}`))
    );
  }

  /* GET actors whose name contains search term */
  searchActors(term: string): Observable<Actor[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Actor[]>(`${this.actorsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found actors matching "${term}"`)),
      catchError(this.handleError<Actor[]>('searchActors', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new actor to the server */
  addActor (actor: Actor): Observable<Actor> {
      return this.http.post<Actor>(this.actorsUrl, actor, httpOptions).pipe(
          tap((actor: Actor) => this.log(`added actor w/ id=${actor.id}`)),
          catchError(this.handleError<Actor>('addActor'))
      );
  }

  /** DELETE: delete the actor from the server */
  deleteActor (actor: Actor | number): Observable<Actor> {
    const id = typeof actor === 'number' ? actor : actor.id;
    const url = `${this.actorsUrl}/${id}`;

    return this.http.delete<Actor>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted actor id=${id}`)),
      catchError(this.handleError<Actor>('deleteActor'))
    );
  }

  /** PUT: update the actor on the server */
  updateActor (actor: Actor): Observable<any> {
    return this.http.put(this.actorsUrl, actor, httpOptions).pipe(
      tap(_ => this.log(`updated actor id=${actor.id}`)),
      catchError(this.handleError<any>('updateActor'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ActorService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ActorService: ' + message);
  }
}
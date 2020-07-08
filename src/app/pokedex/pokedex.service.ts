import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private spriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemon(offset: number, limit: number){
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .toPromise().then(
        response => response['results']
      ).then(
        items => items.map((item, idx) => {
          const id: number = idx + offset + 1;

          return {
            name: item.name, 
            sprite: `${this.spriteUrl}${id}.png`,
            id
          };
        })
      );
  }
  
}

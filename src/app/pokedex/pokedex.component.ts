import { Component, OnInit } from '@angular/core';

import { PokedexService } from './pokedex.service';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemon: Pokemon[] = [];

  isLoading: boolean = false;
  error: boolean = false

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(){
    this.isLoading = true;

    this.pokedexService.getPokemon(this.pokemon.length, 964)
      .then(
        pokemon => {
          console.log(pokemon);
          pokemon = pokemon.map(p => {
            p.imageLoaded = false;
            return p;
          }); 

          this.pokemon = this.pokemon.concat(pokemon);
          this.isLoading = false;
          this.error = false;

      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }
}

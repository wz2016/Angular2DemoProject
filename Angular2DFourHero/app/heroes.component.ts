/**
 * Created by weilunzhao on 11/18/16.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import {HeroService} from './hero.service';
import { OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: [ 'heroes.component.css' ]

})
export class HeroesComponent implements OnInit{
    title = "Tour of Heroes";
    hero : Hero = {
        id: 1,
        name: 'Windstorm',

    };
    // heroes = HEROES;
    heroes: Hero[];

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    getHeroes(): void{
        // this.heroes = this.heroService.getHeroes();
        // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }

    ngOnInit():void{
        this.getHeroes();
    }

    selectedHero: Hero;
    onSelect(hero: Hero): void{
        this.selectedHero = hero;
    }

    gotoDetail() :void{
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
    add(name:string):void{
        name = name.trim();
        if(!name){return ;}
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }
    delete(hero: Hero):void{
        this.heroService
            .delete(hero.id)
            .then(()=>{
                this.heroes = this.heroes.filter(h=>h !== hero);
                if(this.selectedHero === hero){this.selectedHero = null;}
            })
    }

}


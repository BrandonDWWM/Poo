    class Pokemon {
        constructor(nom, hp, attaque, defense, sort) {
          this.nom = nom;       
          this.hp = hp;        
          this.attaque = attaque; 
          this.defense = defense; 
          this.sort = sort;     
        }
      
        attaquer(cible) {
          const degats = Math.max(this.attaque - cible.defense, 0);
          cible.hp = Math.max(cible.hp - degats, 0); 
          console.log(`${this.nom} attaque ${cible.nom} et inflige ${degats} points de dégâts !`);
        }
      
        utiliserSort(cible) {
          if (this.sort) {
            this.sort(this, cible); 
          } else {
            console.log(`${this.nom} n'a pas de sort spécial !`);
          }
        }
      
        afficherStats() {
          console.log(`Nom : ${this.nom}`);
          console.log(`HP : ${this.hp}`);
          console.log(`Attaque : ${this.attaque}`);
          console.log(`Défense : ${this.defense}`);
        }
      
        estKO() {
          return this.hp <= 0;
        }
      }
      
      const creerSort = (nomSort, power) => {
        return (lanceur, cible) => {
          const degats = Math.max(power - cible.defense, 0); 
          cible.hp = Math.max(cible.hp - degats, 0);
          console.log(`${lanceur.nom} lance ${nomSort} et inflige ${degats} points de dégâts à ${cible.nom} !`);
        };
      };

      const ultralaser = creerSort("Ultralaser", 150);
      const dragocharge = creerSort("Draco-charge", 120);
      
      const pokemon1 = new Pokemon("Tyranocif", 180, 150, 100, ultralaser); 
      const pokemon2 = new Pokemon("Galeking", 100, 40, 120, dragocharge); 
      
      class Dresseur {
        constructor(nom) {
          this.nom = nom; 
          this.pokemons = []; 
          this.inventaire = []; 
        }
      
        ajouterPokemon(pokemon) {
          this.pokemons.push(pokemon);
          console.log(`${pokemon.nom} a été ajouté à l'équipe de ${this.nom} !`);
        }
      
        choisirPokemon(index) {
      if (index >= 0 && index < this.pokemons.length) {
        const pokemonChoisi = this.pokemons[index];
        console.log(`${this.nom} envoie ${pokemonChoisi.nom} au combat !`);
        return pokemonChoisi;
      } else {
        console.log(`Index ${index} n'est pas valide dans l'équipe de ${this.nom}.`);
        return null;
      }
    }

        ajouterObjet(objet) {
          this.inventaire.push(objet);
          console.log(`${objet.nom} a été ajouté à l'inventaire de ${this.nom} !`);
        }
      
        utiliserObjet(nomObjet, pokemon) {
          const indexObjet = this.inventaire.findIndex(objet => objet.nom === nomObjet);
          
          if (indexObjet !== -1) {
            const objet = this.inventaire[indexObjet];
            objet.utiliserObjet(pokemon); 
            this.inventaire.splice(indexObjet, 1); 
            console.log(`${this.nom} utilise ${objet.nom} sur ${pokemon.nom} !`);
          } else {
            console.log(`${nomObjet} n'est pas dans l'inventaire de ${this.nom}.`);
          }
        }
        tousPokemonKO() {
          for (let i = 0; i < this.pokemons.length; i++) {
            if (!this.pokemons[i].estKO()) {
              return false; 
            }
          }
          return true; 
        }
      }

      class Objet {
        constructor(nom, effet) {
          this.nom = nom; 
          this.effet = effet; 
        }
      
        utiliserObjet(cible) {
          this.effet(cible);
          console.log(`${this.nom} a été utilisé sur ${cible.nom}.`);
        }
      }
    const potion = new Objet("Potion", (pokemon) => {
      pokemon.hp += 20;
      console.log(`${pokemon.nom} a récupéré 20 HP !`);
    });

    const boostAttaque = new Objet("Boost d'attaque", (pokemon) => {
      pokemon.attaque += 10;
      console.log(`${pokemon.nom} a vu son attaque augmenter de 10 points !`);
    });

    const bouclier = new Objet("Bouclier", (pokemon) => {
      pokemon.defense += 10;
      console.log(`${pokemon.nom} a vu sa défense augmenter de 10 points !`);
    });

    const sacha = new Dresseur('Sacha');
    const regis = new Dresseur('Regis');

    sacha.ajouterPokemon(pokemon1);
    regis.ajouterPokemon(pokemon2);

    sacha.ajouterObjet(potion);
    sacha.ajouterObjet(boostAttaque);
    regis.ajouterObjet(bouclier);
    regis.ajouterObjet(potion);

    const sachaPokemon = sacha.choisirPokemon(0); 
    const regisPokemon = regis.choisirPokemon(0);

    let tour = 1;
    while (!sacha.tousPokemonKO() && !regis.tousPokemonKO()) {
      console.log(`\n--- Tour ${tour} ---`);
    

      sachaPokemon.afficherStats();
      regisPokemon.afficherStats();

      sachaPokemon.sort(sachaPokemon, regisPokemon);
      
      if (regis.tousPokemonKO()) break;

      regis.utiliserObjet("Potion", regisPokemon);

      regisPokemon.sort(regisPokemon, sachaPokemon);
        
      if (sacha.tousPokemonKO()) break;
      
      sachaPokemon.afficherStats();
      regisPokemon.afficherStats();
      
      tour++;
    }

    if (sacha.tousPokemonKO()) {
      console.log("Sacha n'a plus de Pokémon, Regis a gagné !");
    } else if (regis.tousPokemonKO()) {
      console.log("Regis n'a plus de Pokémon, Sacha a gagné !");
    }

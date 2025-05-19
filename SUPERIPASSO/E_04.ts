/*Si vuole realizzare un programma in TypeScript per tenere traccia delle serie televisive e dei film visti.
Si definiscano:
- Un'enumerazione Genre con i seguenti membri:  Action, Animation, Comedy, Drama, Documentary, Horror, Romance, SciFi, Thriller.
- Un'interfaccia Watchable con i seguenti membri: title, genre e duration (espresso in minuti).
- Due classi, Movie e Episode, che implementino l'interfaccia Watchable. 
    - La classe Movie aggiunge il membro directorName e fornisce un costruttore con argomenti title, genre, duration e directorName.
    - La classe Episode aggiunge il membro seriesTitle e fornisce un costruttore con argomenti title, genre, duration e seriesTitle. 
    Inoltre, sia la classe Movie che la classe Episode hanno un membro statico count, che tiene traccia del numero di oggetti 
    creati da quella classe.

Si definisca poi una funzione stats che, dato un array di elementi Watchable rappresentante lo storico degli episodi e film visti,
restituisca un oggetto con membri:
- movies: l'insieme dei titoli dei film presenti nello storico;
- series: l'insieme dei titoli delle serie a cui appartengono gli episodi presenti nello storico;
- duration: la durata complessiva dei contenuti visionati.
Se l'array di Watchable è vuoto, la funzione deve sollevare un'eccezione EmptyWatchHistory.*/

enum Genre {
    Action,
    Animation,
    Comedy,
    Drama,
    Documentary,
    Horror,
    Romance,
    SciFi,
    Thriller
}

interface Watchable{
    title:string;
    genre:Genre;
    duration:number;
}

class Movie implements Watchable{
    title:string;
    genre:Genre;
    duration:number;
    directorNamce:string;
    constructor(title:string, genre:Genre, duration:number, directorName:string){
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.directorNamce = directorName;
        Movie.count++;
    }

    static count = 0;
}

class Episode implements Watchable{
    title:string;
    genre:Genre;
    duration:number;
    seriesTitle:string;
  constructor(title: string, genre: Genre, duration: number, seriesTitle: string) {
      this.title = title;
      this.genre = genre;
      this.duration = duration;
      this.seriesTitle = seriesTitle;
      Episode.count++;
  }

    static count=0;
}

function stats(a:Watchable[]):{"movies":Set<string>,"series":Set<string>,"duration":number}{
    if(a.length==0) throw new EmptyWatchHistory();
    let movies: Set<string> = new Set<string>();
    let series: Set<string> = new Set<string>();
    let duration = 0;
    for (const item of a) {
        if (item instanceof Movie) {
            movies.add(item.title);
        } else if (item instanceof Episode) {
            series.add(item.seriesTitle);
        }
        duration += item.duration;
    }
    return {"movies":movies, "series":series, "duration":duration};
}

class EmptyWatchHistory extends Error{}


/*Si scriva in TypeScript una classe generica MetaMap<K, V, M> che memorizza una mappa tra chiavi di tipo K e valori di tipo V,
con relativi metadati di tipo M. Il tipo M deve essere un oggetto che contiene obbligatoriamente una proprietà numerica timestamp.
La classe deve fornire:
- un metodo set(k, v, m) che crea una nuova associazione k → v con metadato m, oppure aggiorna il valore e il metadato se la 
    chiave k esiste già.
- un metodo get(k) che restituisce una tupla con il valore e il metadato associati alla chiave k, oppure undefined se la 
    chiave non esiste.*/

interface pippo{
    timestap:number;
}

class MetaMap<K,V,M extends pippo>{
    map:Map<K,[V,M]> = new Map<K,[V,M]>();
    constructor(){}
    set(k:K, v:V, m:M):void{
        this.map.set(k,[v,m]);
    }

    get(k:K):[V,M]|undefined{
        if(this.map.has(k)) return this.map.get(k)!;
        return undefined;
    }
}

/*Si scriva in TypeScript una funzione createPasswordValidator che accetti un numero minLength e un numero minDigits.
La funzione deve restituire una funzione di validazione che, dato un oggetto con proprietà password, restituisce true
se e solo se la password è lunga almeno minLength e contiene almeno minDigits cifre.*/

interface pippo{
    password:string;
}

function createPasswordValidator(minLength:number, minDigits:number):any{
    return function <T extends pippo>(o:T):boolean{
        if(o.password.length < minLength) return false;
        let digit:string[] = o.password.match(/[0-9]g/) || [];
        if(digit.length < minDigits) return false;
        return true;
    }
}
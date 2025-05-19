/*Scrivere una funzione TypeScript centroid(points) che, dato un insieme di punti, restituisce il centroide del gruppo.
I punti in points possono essere oggetti di qualunque tipo, purché includano due campi x e y (numerici).
Il centroide è il punto medio delle coordinate, ovvero la media aritmetica dei valori x e y di tutti i punti.
Se l’insieme è vuoto, la funzione deve restituire undefined.
Attenzione: il tipo di points può essere qualunque, purché includa i campi x e y.*/

interface pippo{
    x:number;
    y:number;
}

function centroid<T extends pippo>(points:T[]):{x:number,y:number}|undefined{
    let medx = points.reduce((sum,val) => sum + val.x,0)/points.length;
    let medy = points.reduce((sum,val) => sum + val.y,0)/points.length;
    return {x:medx,y:medy};
}

/*Scrivere una funzione TypeScript punteggio(squadra: Cantante[]) che, dato un array di cantanti (rappresentati come oggetti
aventi i campi nome, ruolo e posizione), restituisce il punteggio complessivo della squadra. Il punteggio si calcola moltiplicando
i punti accumulati dal cantante in base alla posizione in classifica finale per un coefficiente dato dal ruolo assegnato al cantante.
Il ruolo è definito da una enum Ruolo con valori: Riserva (coefficiente=0), Titolare (coefficiente=1) e Capitano (coefficiente=2)
I punti sono definiti da una enum Posizione con valori: Primo (100 punti), Secondo (50 punti), Terzo (25 punti), Top5 (10 punti),
Altro (0 punti). La funzione punteggio(squadra) deve lanciare un'eccezione FormazioneErrata se la squadra non include esattamente
1 capitano e 4 titolari (oltre alle eventuali riserve).
Definire l'interfaccia Cantante (avente campi nome, ruolo e posizione)*/

class FormazioneErrata extends Error{;}

enum Ruolo{
    Riserva = 0,
    Titolare = 1,
    Capitano = 2
}

enum Posizione {
    Primo = 100,
    Secondo = 50,
    Terzo = 25,
    Top5 = 10,
    Altro = 0
}

interface Cantante{
    nome:string;
    ruolo:Ruolo;
    posizione:Posizione;
}

function punteggio(squadra:Cantante[]):number{
    if(squadra.filter(x=> x.ruolo == Ruolo.Capitano).length != 1) throw new FormazioneErrata();
    if(squadra.filter(x => x.ruolo == Ruolo.Titolare).length != 4) throw new FormazioneErrata();
    return squadra.reduce((sum,val) => sum + val.ruolo * val.posizione,0);
}


/*Definire una classe TypeScript CachedFunction che rappresenti funzioni generiche con cache, ovvero funzioni per cui
il valore calcolato per un certo input viene memorizzato in una cache. Un oggetto CachedFunction viene creato passando
la funzione f di cui creare una cache ed un valore numerico cache_limit che determina la validità di un valore
(se cache_limit=3, il valore in cache può essere riutilizzato 3 volte, prima di ricalcolarlo). La classe CachedFunction deve
mettere a disposizione due funzioni:
- get_cache(v) che restituisce una coppia [f(v),count], dove count rappresenta il numero di volte che f(v) è stato riutilizzato 
    (0 inizialmente), senza però alterare il count; se non c'è cache per v, restituisce undefined.
- get_value(v) che restituisce f(v), calcolando il valore se non esiste in cache o se è stato raggiunto il limite di riutilizzi,
    oppure restituendo il valore in cache se sempre valido (e incrementando il count di uno).

Definire inoltre una classe CachedNumericFunction che estenda CachedFunction per rappresentare funzioni da numeri a numeri con cache.

Attenzione: la funzione f prende un solo parametro in input e ne restituisce uno in output.*/

class CachedFunction<I,O>{
    fun:(a:I)=>O;
    limit:number;
    map:Map<I,[O,number]> = new Map<I,[O,number]>();
    constructor(f:(a:I)=>O,cl:number){
        this.fun = f;
        this.limit = cl;
    }

    get_cache(v:I):[O,number]|undefined{
        if(this.map.has(v)) return this.map.get(v)!;
        return undefined;
    }

    get_value(v:I):O{
        if(!(this.map.has(v)) || this.map.get(v)![1] == this.limit){
            let res:O = this.fun(v);
            this.map.set(v,[res,0]);
            return res;
        }else{
            this.map.get(v)![1]++;
            return this.map.get(v)![0];
        }
    }
}

class CachedNumericFunction extends CachedFunction<number,number>{
    constructor(f:(a:number)=>number,cl:number){
        super(f,cl);
    }
}
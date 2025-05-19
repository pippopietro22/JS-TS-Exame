/*Si definisca in TypeScript un tipo Comp che descrive un oggetto con i campi nome (stringa) e dip (un array di altri Comp). 
Il dip-set di un Comp è l'insieme di tutti i Comp nel suo dip, unito ai dip-set di ciascuno di questi Comp.

Si scriva una funzione TypeScript maxdipset(S) che, dato un insieme S di Comp (si usi per questo la classe di libreria Set), 
restituisca il sottoinsieme di S contenente tutti i Comp il cui dip-set ha cardinalità massima (fra quelli in S).*/

type Comp = {nome:string, dip:Comp[]}

function maxdipset(s:Set<Comp>):Set<Comp>{
    let res:Set<Comp> = new Set<Comp>();
    let max = 0;
    for(let el of s){
        let aux:number = dipset(el).size;
        if(aux > max){
            max = aux;
            res.clear();
            res.add(el);
        }else if(aux == max) res.add(el);
    }
    return res;
}

function dipset(o:Comp,res:Set<Comp> = new Set<Comp>()):Set<Comp>{
    for(let el of o.dip){
        if(!res.has(el)){
            res.add(el);
            dipset(el,res);
        }
    }
    return res;
}

/*Si scriva una classe generica in TypeScript FunctionStore con il seguente funzionamento.

Al momento della creazione di una istanza, al costruttore possono essere passate un numero qualunque di funzioni, 
aventi tutte tipo T→R. L'istanza memorizza queste funzioni per uso futuro.
Ogni istanza di FunctionStore ha inoltre le seguenti funzionalità:
- un metodo roundrobin(t) che, ricevuto un valore di tipo T, applica ad esso una delle funzioni, in ordine, e restituisce il 
    suo risultato. La prima volta che il metodo viene chiamato, il risultato è calcolato usando la prima delle funzioni passate al 
    costruttore; la seconda volta si usa la seconda funzione, e così via; dopo aver usato l'ultima funzione, si ritorna alla prima.
- un metodo random(t) che, ricevuto un valore di tipo T, applica una delle funzioni disponibili, in maniera casuale, 
    e restituisce il risultato.
- un metodo roundrobin(fs,t) che si comporta come roundrobin(t), ma "inoltra" la richiesta di calcolo di roundrobin() 
    a un'altra istanza di FunctionStore, passata in fs, e poi applica al risultato di quest'ultima la propria funzione, 
    scorrendo l'ordine di roundrobin come sopra.
- una proprietà di sola lettura counts il cui valore è un array di interi, ciascuno dei quali indica quante volte è stata 
    chiamata la corrispondente funzione memorizzata nell'istanza.

Nessun dato memorizzato in una istanza di FunctionStore deve essere visibile all'esterno.*/

class FunctionStore<T,R>{
    arrFun:((a:T)=>R)[];
    #count:number[] = [];
    constructor(...f:((a:T)=>R)[]){
        this.arrFun = f;
        for(let i = 0; i < this.arrFun.length; i++) this.#count.push(0);
    }

    rrcount:number = 0;
    roundrobin(t:T):R{
        let idx:number = this.rrcount % this.arrFun.length
        this.#count[idx]++;
        return this.arrFun[idx](t);
    }

    random(t:T):R{
        let idx = Math.random()*(this.arrFun.length-1);
        this.#count[idx]++;
        return this.arrFun[idx](t);
    }

    roundrobin(fs:FunctionStore<T,T>,t:T):R{
        return this.roundrobin(fs.roundrobin(t));
    }
}
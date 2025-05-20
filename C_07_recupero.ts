/*Si vuole realizzare in TypeScript una classe che rappresenta un multi-insieme di elementi omogenei per tipo,
con la possibilità di aggiungere e togliere elementi dal multi-insieme, e la capacità di ricordare il livello
massimo (ovvero: il massimo numero di istanze) a cui un elemento è arrivato dalla creazione del multi-
insieme.

Si scriva dunque la classe HWMSet con le seguenti caratteristiche:
• Un costruttore che può essere invocato senza argomenti (nel qual caso viene costruito un multi-
insieme vuoto) oppure con un solo argomento che è un altro multi-insieme (in questo caso, il multi-
insieme viene clonato, ovvero se ne crea una copia con gli stessi dati dell'argomento ma distinta da
esso), oppure con un solo argomento che è una qualunque sequenza di elementi del tipo dato (che
vengono inseriti tutti nel multi-insieme che si sta creando).
• Due metodi, put(e) e take(e) che hanno l'effetto, rispettivamente, di aggiungere/togliere una istanza
di e nel/dal multi-insieme. Si noti che se il multi-insieme non contiene e, take(e) non ha alcun
effetto.
• Due metodi, cnt(e) e max(e) che restituiscono, rispettivamente, il numero corrente di istanze di e
nel multi-insieme, e il numero massimo di istanze di e che sono state contenute
contemporaneamente nel multi-insieme
• Un generatore bydelta() che restituisce, uno dopo l'altra, una serie di coppie [e, delta] dove delta è la
differenza fra il numero massimo e il numero corrente di istanze di e nel multiinsieme; gli elementi
devono essere restituiti per valori di decrescenti (in caso di parità, va bene qualunque ordine).*/


class HWMSet<T>{
    #cnt:Map<T,number> = new Map<T,number>();
    #max:Map<T,number> = new Map<T,number>();

    constructor(m:HWMSet<T>|Iterable<T>){
        if(m instanceof HWMSet){
            this.#cnt = new Map<T,number>(m.#cnt.entries());
            this.#max = new Map<T,number>(m.#max.entries());
        }else{
            for(let el of m){
                this.put(el);
            }
        }
    }

    put(e:T):void{
        let n:number = (this.#cnt.has(e)) ? this.#cnt.get(e)! + 1 : 1;
        this.#cnt.set(e,n);
        if(!this.#max.has(e) || n > this.#max.get(e)!) this.#max.set(e,n);
    }

    take(e:T):void{
        if(this.#cnt.has(e)){
            let n:number = this.#cnt.get(e)! - 1;
            this.#cnt.set(e,n);
        }
    }

    cnt(e:T):number{return (this.#cnt.has(e)) ? this.#cnt.get(e)! : 0}
    max(e:T):number{return (this.#max.has(e)) ? this.#max.get(e)! : 0}

    *bydelta():Generator<[T,number]>{
        let res:[T,number,number][]=[];
        for(let e of this.#cnt.keys()){
            res.push([e,this.cnt(e),this.max(e)]);
        }
        res.sort(function(a,b):number{
            return (b[2]-b[1])-(a[2]-a[1]);
        });
        for(let t of res){
            yield [t[0],t[2]-t[1]];
        }
    }
}





/*Una direzione è un valore fra Nord, Sud, Est, Ovest. Uno spostamento è caratterizzato da una
direzione e una lunghezza (numerica). Una posizione è data da una coppia di coordinate
cartesiane.
In TypeScript, si rappresenti una direzione come una enum Dir, uno spostamento come un
oggetto Step con proprietà d (direzione) e l (lunghezza), e una posizione come una coppia Point
di due elementi numerici.
Si scriva poi una funzione TypeScript walk(o,p) che, dati una posizione di origine o e un percorso
p, restituisca la posizione finale che si raggiunge partendo da o e seguendo tutti gli spostamenti in
p. Si assuma che p sia, nel modo più generale possibile, una sequenza finita di spostamenti.*/


enum Dir{
    Nord,
    Sud,
    Est,
    Ovest
}
type Step = {d:Dir,l:number}
type Point = [number,number]
function walk(o:Point,p:Iterable<Step>):Point{
    let res:Point = [o[0],o[1]];

    for(let s of p){
        if(s.d == Dir.Nord || s.d == Dir.Sud){
            res[1] += (s.d == Dir.Nord) ? s.l : -s.l;
        }else{
            res[0] += (s.d == Dir.Est) ? s.l : -s.l;
        }
    }
    
    return res;
}
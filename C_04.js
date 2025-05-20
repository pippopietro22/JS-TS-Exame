/*
Una successione di Limortacci a1,a2,... è definita da una sequenza di valori interi i1,...,ik. 
I primi k termini della successione sono identici agli interi dati; i termini successivi sono invece dati dalla somma dei
precedenti k termini.
Formalmente: aj = ij (se 0<j<k) oppure a sum(da h=j-k fino a j-1) di ah

Come caso particolare, Limortacci(1,1) coincide con la successione di Fibonacci.

Si scriva una classe JavaScript che implementi la successione di Limortacci. Il costruttore deve prendere come argomenti gli
interi i1,...,ik e inizializzare un'istanza della classe in modo che essa rappresenti la successione inizializzata con quei 
particolari valori. Le istanze devono avere un generatore succ() che restituisca, in ordine e uno alla volta, i termini aj
di quella particolare successione, iniziando da a1. I dati interni devono essere tutti privati.*/

class Limortacci{
    #i;
    constructor(...i){
        this.#i = i;
    }

    *succ(){
        for(let i = 0; i < this.#i.length; i++){
            yield this.#i[i];
        }

        let i = 0;
        while(1){
            let sum = this.#i.slice(i).reduce((sum,val) => sum + val,0);
            yield sum;
            this.#i.push(sum);
            i++;
        }
    }
}


/*Un QuadTree è un albero i cui nodi hanno come valore un punto cartesiano [x,y], e fra 0 e 4 figli.
Un QuadTree può essere usato come un albero di ricerca, con la convenzione che in fase di ricerca
(per ricercare un punto o per inserire un nuovo punto) si "scende" lungo i rami in base alla posizione
relativa del punto del nodo padre e di quello ricercato. In particolare, il primo figlio rappresenta
il sottoalbero di punti che ricadono nel primo quadrante (relativo alla posizione del punto padre),
e così via.

Per convenzione, se la coordinate x del figlio è uguale a quella del padre, si considera che esso ricada nel I o IV quadrante;
se la coordinata y del figlio è uguale a quella del padre, si considera che esso ricada nel I o II quadrante.

Si scriva una classe QTNode che rappresenti un nodo di un QuadTree di ricerca. La classe deve implementare:
-un costruttore che prenda come argomento un punto cartesiano [x,y] (espresso come coppia)
-un metodo add(n) che inserisce il nodo n come discendente del nodo
-un metodo find([x,y]) che restituisce un riferimento al nodo di coordinate [x,y], se è presente nel sottoalbero
    radicato nel nodo corrente, oppure null se non è presente
-due getter maxd e mind il cui valore sia, rispettivamente, il massimo e il minimo della profondità dell'albero
    radicato nel nodo corrente

Si scriva poi una classe QTree che rappresenti un albero (QuadTree) di ricerca. La classe deve implementare:
-un costruttore senza argomenti
-un metodo addPoint([x,y]) che aggiunga il punto di coordinate [x,y] all'albero, nella posizione opportuna
-un campo pubblico root che contenga la radice dell'albero (o null se non ci sono nodi)
-un campo pubblico size che contenga, in ogni momento, il numero di nodi attualmente presenti nell'albero.*/

class QTree{
    constructor(){
        this.root = null;
        this.size = 0;
    }

    addPoint([x,y]){
        let newNode = new QTNode([x,y]);
        
        if(this.root == null){
            this.root = newNode;
        }else{
            this.root.add([x,y]);
        }

        this.size++;
    }
}

class QTNode{
    x;
    y;
    figli = [null,null,null,null];
    constructor([x,y]){
        this.x = x;
        this.y = y;
    }

    add(n){
        let isTop = n.y >= this.y;
        let isRight = n.x >= this.x;

        let idx = (isTop) ? ((isRight) ? 0 : 1) : ((isRight) ? 3 : 2);
        if(this.figli[idx] == null){
            this.figli[idx] = n;
        }else{
            this.figli[idx].add(n);
        }
    }

    find([x,y]){
        if(!this) return null;
        if(this.x == x && this.y == y) return this;

        let res = null;
        for(let f of this.figli){
            if(f.x = x && f.y == y) return f;
            let aux = f.find([x,y]);
            if(aux != null) return aux;
        }

        return null;
    }

    get maxd(){
        let res = 0
        for(let f of this.figli){
            if(f != null) continue;
            res = Math.max(res,f.maxd);
        }
        return 1 + res;
    }

    get mind(){
        let res = Infinity
        for(let f of this.figli){
            if(f == null) return 0
            res = Math.min(res,f.mind);
        }
        return 1 + res;
    }
}


/*Scrivete un frammente di codice JavaScript che aggiunga a tutte le stringhe del programma un metodo toU()
che restituisce una nuova stringa, identica alla stringa data, ma in cui tutte le vocali minuscole sono sostituite da "u"
e le vocali maiuscole da "U".*/

// let vocMin = {"a":1, "e":1, "i":1, "o":1}
// let vocMai = {"A":1, "E":1, "I":1, "O":1}

// String.prototype.toU() = function(){
//     let res = ""
//     for(let i = 0; i < this.length; i++){
//         if(this[i] in vocMin){
//             res += "u";
//         }else if (this[i] in vocMai){
//             res += "U";
//         }else{
//             res = res + this[i];
//         }
//     }
//     return res;
// }

String.prototype.toU() = function(){
    return this.replace(/[aeiou]/g,'u').replace(/[AEIOU]/g,'U');
}


/*Si scriva in JavaScript una sottoclasse di Array, di nome PilaL, che è destinata a implementare una pila a lunghezza limitata,
e ha lo stesso comportamento di Array con soltanto queste modifiche:
-Le istanze di PilaL hanno una proprietà max che determina la massima lunghezza che l'array può raggiungere. 
    Quando viene assegnato un valore a max, se la lunghezza corrente della pila è superiore, la pila viene "scorciata" eliminando 
    gli elementi più vecchi (ovvero: inseriti meno recentemente con push()). La lettura di max restituisce l'ultimo valore assegnato 
    a max. Alla creazione di una PilaL, il valore di default di max è 10.
-Le istanze di PilaL hanno un metodo push(e) inserisce e in coda all'array, come di consueto, ma se così facendo la lunghezza supera 
    il max, allora il primo elemento (quello più in fondo nella pila) viene eliminato, in modo che la lunghezza non superi max.

Per evitare confusione fra pile e code, le chiamate a shift() e unshift() su un oggetto PilaL non hanno nessun effetto.*/

class PilaL extends Array{
    #max = 10;
    constructor(max){
        super();
        this.#max=max;
    }

    push(e){
        this.push(e);
        if(this.length > this.#max) super.shift();
    }

    shift(){}

    unshift(x){}

    get max(){
        return this.#max;
    }

    set max(x){this.#max=x};
}


/**/
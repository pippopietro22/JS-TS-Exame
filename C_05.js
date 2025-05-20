/*Si scriva il codice JavaScript che implementa la funzione schizzinosa(n1, ... nk), che prende come argomenti una sequenza 
non-vuota di numeri primi compresi fra 0 e 1000 (estremi esclusi), e restituisce la loro somma. La funzione non si fida però del 
chiamante, e quindi deve controllare che gli argomenti passati siano validi. Se la sequenza è vuota, la funzione deve lanciare
un EmptyArgsError. Se anche uno solo degli argomenti è invalido, la funzione deve lanciare un BadArgError.
Gli oggetti BadArgError devono avere due proprietà in sola lettura: index è la posizione del primo argomento
invalido (da 1 a k inclusi), e value è il valore del primo argomento invalido. In particolare, dovete definire eccezioni
diverse per i diversi casi: OutOfRangeError se non è incluso entro i limiti, NotIntegerError se non è un intero, NotPrimeError
se un argomento non è primo. Questi ultimi sono tutti casi particolari di BadArgError. Nel caso un argomento violi più di un vincolo,
va lanciato il primo errore corrispondente nell'ordine in cui li abbiamo elencati.*/


function schizzinosa(...n){
    if(n.length == 0) throw new EmptyArgsError();
    let sum = 0;
    for(let i = 0; i < n.length; i++){
        if(n[i] < 0 || n[i] > 1000) throw new OutOfRangeError(i,n[i]);
        if(Number.isInteger(n[i])) throw new NotIntegerError(i,n[i]);
        if(!primo(n[i])) throw new NotPrimeError(i,n[i]);
        sum += n[i];
    }
    return sum;
}

function primo(n){
    if(n == 0) return true;
    for(let i = 2; i < Math.floor.sqrt(n/2); i++){
        if(n % i == 0) return false;
    }
    return true;
}

class EmptyArgsError extends Error{;}
class BadArgError extends Error{
    #index;
    #value;
    constructor(i,v){
        this.#index = i;
        this.#value = v;
    }

    get index(){return this.#index;}
    get value() {return this.#value;}
}
class OutOfRangeError extends BadArgError{}
class NotIntegerError extends BadArgError{}
class NotPrimeError extends BadArgError{}

/*Si scriva una funzione JavaScript rank(A,k) che, dato un array A di elementi qualunque, anche ripetuti, e un valore k,
restituisca il rank di k in A, ovvero la posizione che k occupa nell'ordinamento dal più frequente al meno frequente dei valori in A.
I valori che hanno lo stesso numero di occorrenze hanno lo stesso rank, e occupano tutti la stessa "posizione"
(questo è differente rispetto all'ex-aequo, in cui si considera che se c'è una parità fra due valori al secondo posto,
il successivo si considera al quarto e nessuno al terzo). Se k non compare in A, il suo rank è undefined.
ATTENZIONE: gli elementi di A sono di tipo qualunque (anche tipo riferimento), e l'equivalenza per contare le copie
è data secondo l'operatore ===.*/

function rank(a,k){
    let freq = new Map();
    for(let el of a){
        freq.set(el, (freq.get(el) || 0) + 1);
    }
    let S = [...freq.keys()];
    S.sort(function(a,b){return freq.get(b)-freq.get(a)});

    let rank = 0;
    let prec;
    for(let el of S){
        if(freq.get(el) !== freq.get(prec)) rank++;
        if(el == k) return rank;
        prec = el;
    }

    return undefined;
}

var p=[1,2], q=[3,4], r=[1,2], s=[3,4]
var A=[p,p,q,r,s,q,p,r,s,p,s,q] // 4p, 3q, 3s, 2r, 
console.log(rank(A,r),3)
console.log(rank(A,p),1)
console.log(rank(A,q),2)
console.log(rank(A,s),2)
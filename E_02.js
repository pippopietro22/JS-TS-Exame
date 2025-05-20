/*Scrivere una funzione Javascript indisponibili(l), che può essere usata in una libreria per gestire i libri
che non sono più disponibili. La funzione prende come parametro l, un array di libri rappresentati con oggetti
che hanno almeno le chiavi 'titolo' (il titolo del libro) e 'disp' (la quantità disponibile).
La funzione restituisce un array contenente tutti i libri non disponibili, i.e. con il campo 'disp' uguale a 0.
I libri nell'array risultato devono essere ordinati in ordine alfabetico per titolo. L'array originale non deve cambiare.*/

function indisponibili(l){
    let res = [];
    l.forEach(x => {if(x.disp == 0) res.push(x);});
    return res.sort(function cmp(a,b){
        if(a.titolo > b.titolo) return 1;
        return -1;
    });
}


/*Scrivere una funziona Javascript contaFogliePari(t) che dato un albero binario t, contenente numeri interi,
rappresentato con oggetti come visto a lezione, restituisce il numero di foglie che ha come valore un numero pari.*/

function contaFogliePari(t){
    if(!t) return 0;
    return (!t.sx && !t.dx) ? ((t.val % 2 == 0) ? 1 : 0) : (contaFogliePari(t.sx) + contaFogliePari(t.dx));
}

/*Scrivere una funzione Javascript minMax(a) che prende come parametro a un array contenente insiemi rappresentati
con oggetti come visto a lezione. La funzione deve restituire un insieme nuovo che contiene solo le chiavi
di valore minimo e massimo di ogni insieme in.*/

function minMax(a){
    let res = {};
    a.forEach(x => {
        let min = Infinity;
        let max = -Infinity;
        for(let key in x){
            if(Number(key) < min) min = key;
            if(Number(key) > max) max = key;
        }
        if(max != Infinity) res[max] = 1;
        if(min != Infinity) res[min] = 1;
    })
    return res;
}

/*Scrivere una funzione in Javascript cambiobase(n,b1,b2), che prende come parametro una stringa n e b1, b2 due numeri naturali tra
2 e 10 compresi. La stringa n rappresenta un numero in base b1. La funzione deve restituire una stringa con la rappresentazione 
del numero in base b2.
Si può assumere che sia formattato correttamente, contenendo solo le cifre valide per la rappresentazione in base.*/

function cambiobase(n,b1,b2){
    let b10 = 0;
    let res = "";
    for(let i = 0; i < n.length; i++){
        b10 += Number(n[n.length-1-i])*Math.pow(b1,i);
    }

    while(b10 > 0){
        res = String(b10 % b2) + res;
        b10 = Math.floor(b10/b2);
    }

    return res;
}

console.log(cambiobase("35",10,2))
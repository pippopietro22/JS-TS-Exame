/*Si consideri un albero k-ario T, rappresentato come visto a lezione, con il vincolo aggiuntivo che
ogni nodo può avere al più 9 figli (numerati da 1 a 9). Un path in T è rappresentato come una
stringa di cifre (fra 1 e 9), in cui ogni cifra indica su quale dei figli "scendere", in ordine, partendo
dalla radice. Per esempio, il path "43" indica il terzo figlio del quarto figlio della radice.
Si scriva una funzione JavaScript ts(T,p,R) che, dati due alberi T e R come definiti sopra, e un
path p, modifica T rimuovendo il sotto-albero indicato da p, e inserendo al suo posto R. Se p
indica un nodo non esistente, la funzione deve lanciare un errore di tipo NotFoundError, che
dovrete definire, senza modificare l'albero. Questo errore deve avere un campo tree che contiene
un riferimento all'albero T, un campo upto che indica la parte di path che è stato possibile
seguire, e miss che indica la parte rimanente. Per esempio, se il path è "1322" ma il terzo figlio
del primo figlio della radice non ha almeno due figli, upto deve contenere "13" e miss “22”.*/

class NotFoundError extends Error{
    constructor(msg,tree,upto,miss){
        super(msg);
        this.tree = tree;
        this.upto = upto;
        this.miss = miss
    }
}

function ts(t,p,r,OT = t,OP = p){
    if(!t || !t.figli[p[0]-1]) throw new NotFoundError("path invalido",OT,OP.substring(0,OP.length-p.length),p);
    if(p.length == 1){
        t.figli[p[0]-1] = r;
        return;
    }
    ts(t.figli[p[0]-1],r);
}




/*Un numero naturale positivo si dice grazioso se esso è divisibile per il numero ottenuto ordinando
in ordine numerico crescente le cifre che lo compongono. Per esempio, 670 è grazioso, perché
divisibile per 67.
Si scriva una funzione JavaScript cugini(n) che, dato un numero naturale positivo n, restituisce
una coppia [a,b] in cui a e b sono, rispettivamente, il massimo dell’insieme {r|r<=n and r è grazioso}
e il minimo dell'insieme {r | r >= n and r è grazioso}. Si noti che se n è grazioso, il risultato sarà [n,n].*/

function cugini(n){
    let r = n, l = n;
    while(!grazioso(r))r++;
    while(!grazioso(l))l++;
    return[l,r];
}

function grazioso(n){
    return n % Number(String(n).split("").sort(function(a,b){if(a>b)return 1; return -1}).join("")) == 0;
}
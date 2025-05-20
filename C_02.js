/*Si scriva una funzione JavaScript sommak(A,k,d) che, ricevuto un array di numeri naturali A, 
un numero naturale k, e un numero naturale d fra 0 e 9 (inclusi), restituisca la somma di tutti 
i numeri in A la cui k-esima cifra della rispettiva rappresentazione decimale è d. 
Le cifre vengono contate dalla meno significativa: se k=0 è la cifra delle unità, se k=1 quella delle decine, 
se k=2 quella delle centinaia, ecc. Naturalmente, le cifre "mancanti" vanno considerate 0 (sono gli 0 non significativi a 
sinistra del numero).*/

function sommak(a,k,d){
    let res = 0;
    a.forEach(x => {
        let aux = x;
        let digit;
        for(let i = 0; i <= k; i++){
            digit = aux % 10;
            aux = Math.floor(aux/10);
        }
        if(digit == d) res += x;
    })
    return res;
}

/*Un oggetto "studente" è descritto dai seguenti campi:

-nome
-matricola
-voti (un array di interi compresi in [18,30])
Si scriva una funzione JavaScript primoDellaClasse(C) che data una classe C (non vuota),
rappresentata come array di oggetti "studente", restituisca lo studente con media più alta.
In caso di parità, la funzione deve restituire il primo trovato nell'array. Gli studenti che non hanno nessun esame,
sono considerati avere media 0.*/

function primoDellaClasse(c){
    let res;
    let max = -Infinity;
    c.forEach(x => {
        let media = (x.voti.length != 0) ? x.voti.reduce((sum,val) => sum+val,0)/x.voti.length : 0;
        if(media > max){
            max = media;
            res = x;
        }
    })
    return res;
}

/*Sia A un array di insiemi, ciascuno dei quali realizzato come visto a lezione tramite un oggetto.
Si scriva una funzione dosetop(A) che restituisca l'insieme di tutti gli elementi che compaiono in 
tutti gli insiemi presenti in A.*/

function dosetop(a){
    let res = {};
    for(let key in a[0]){
        let check = true;
        for(let i = 1; i < a.length; i++){
            if(!(key in a[i])) check = false;
        }
        if(check) res[key] = 1;
    }
    return res;
}


/*Si scriva una funzione JavaScript contafigli(T) che, dato un albero binario T rappresentato con oggetti come visto a lezione, 
restituisca una coppia di interi [s,d], in cui s è il numero di nodi di T che sono figli sinistri del loro genitore, 
mentre d è analogamente il numero di nodi di T che sono figli destri del loro genitore.*/

function contafigli(t){
    let l = conta(t,0);
    let r = conta(t,1)
    return [l,r];
}

function conta(t,i){
    if(!t) return 0;
    if(i == 0){
        return (t.sx) ? (1 + conta(t.sx,i) + conta(t.dx,i)) : (conta(t.dx,i));
    }else{
        return (t.dx) ? (1 + conta(t.dx,i) + conta(t.sx,i)) : (conta(t.sx,i));
    }
}


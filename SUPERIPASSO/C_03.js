/*Si scriva una funzione JavaScript cleanSet(S,p) che, dato un multi-insieme S codificato come visto a lezione,
e un predicato p da stringhe a booleani, modifichi S in modo da eliminare tutti gli elementi che non soddisfano p.
La funzione deve restituire il numero di elementi rimasti in S.*/

function cleanSet(s,p){
    for(let key in s){
        if(!p(key)) delete s[key];
    }
    return Object.keys(s).length;
}

/*
Si scriva una funzione JavaScript kabovep(k,p,n1,n2,n3,...) in cui tutti gli argomenti sono numeri e k è un intero con k≥0. 
La funzione deve restituire un array con i primi al più k numeri, fra quelli in n1,n2,n3,... che sono strettamente maggiori di p.*/

function kabovep(k,p,...n){
    console.log("n: ",n)
    let res = n.filter(x => x > p);
    console.log("res: ",res);
    return res.slice(0,k);
}

/*Si scriva una funzione in JavaScript sommaEstremi(A) che, dato un array A con elementi numerici,
restituisca un nuovo array contenente in posizione 0 la somma del minimo e del massimo di A;
in posizione 1 la somma del secondo più alto e del secondo più basso elemento di A, ecc. Se A è di lunghezza dispari,
il suo elemento mediano viene sommato a se stesso (e il risultato sarà l'ultimo elemento dell'array risultante).
L'array A non deve essere modificato.*/

function sommaEstremi(a){
    let aux = JSON.parse(JSON.stringify(a));
    aux.sort(function(a,b){return a-b});
    let res = [];
    for(let i = 0; i < Math.round(aux.length/2); i++){
        res.push(aux[i]+aux[aux.length-1-i]);
    }
    return res;
}

/*Si scriva una funzione JavaScript nuovaCoda() con le seguenti caratteristiche:

la funzione deve restituire un nuovo oggetto (chiamiamolo Q), avente (almeno) due chiavi enqueue e dequeue.
il valore di enqueue deve essere una funzione che, dato un valore qualunque, lo inserisce in coda 
(memorizzandolo in un modo a vostra discrezione in Q) il valore di dequeue deve essere una funzione che,
senza prendere nessun argomento, rimuove e restituisce il primo elemento dalla coda (memorizzato in precedenza da enqueue). 
Se la coda è vuota, questa funzione deve restituire undefined.
Attenzione: si noti che ogni coda restituita da una chiamata a nuovaCoda() è distinta da ogni coda restituita da una diversa 
chiamata a nuovaCoda().*/

function nuovaCoda(){
    return {enqueue:function(x){
        this.q.push(x);
    }, 
    dequeue:function(){
        return this.q.shift();
    }, 
    q:[]};
}


/*Si scriva una funzione JavaScript innesta(T1,v1,T2,v2) con il seguente funzionamento:

T1 e T2 sono alberi k-ari, realizzati come visto a lezione; è garantito che i valori dei nodi di T1 e di T2 siano tutti distinti
v1 e v2 sono due valori; è garantito che v1 compaia in T1, e che v2 compaia in T2; è garantito anche che v1 e v2 non saranno 
i valori dei nodi radice di T1 e T2 la funzione deve scambiare il sottoalbero di T1 radicato nel nodo con valore v1,
con il sottoalbero di T2 radicato nel nodo con valore v2*/

function innesta(t1,v1,t2,v2){
    let [rif1,idx1] = trova(t1,v1);
    let [rif2,idx2] = trova(t2,v2);

    let rifaux = rif1.figli[idx1];
    rif1.figli[idx1] = rif2.figli[idx2];
    rif2.figli[idx2] = rifaux;
}

function trova(t,v){
    if(!t) return;
    if(!t.figli || t.figli.length == 0)return;
    for(let i = 0; i < t.figli.length; i++){
        if(t.figli[i].val == v) return [t,i];
        let aux = trova(t.figli[i],v);
        if(aux != undefined) return aux;
    }
    return;
}
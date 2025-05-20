/*Data una funzione f, un punto x del dominio di f si definisce punto fisso se il risultato dell'applicazione f(x) = x.
Si scriva una funzione punto_fisso(f) che prende come argomento una funzione f e restituisce una funzione che,
preso in input un insieme di interi X restituisce 1 se l'insieme X è punto fisso di f, 0 altrimenti.

NOTA: X è un'insieme, quindi attenzione a come viene verificata l'uguaglianza tra f(X) e X.*/

function punto_fisso(f){
    return function(x){
        let imm = f(x);
        
        let check = true;
        for(let key in x){
            if(!(key in imm)) check = false;
        }
        for(let key in imm){
            if(!(key in x)) check = false;
        }
        return (check) ? 1 : 0;
    }
}


/*Sia data una coppia di insiemi A e B i cui elementi dell'insieme sono stringhe. Si scriva la funzione prodotto(A,B) 
che implementi il prodotto cartesiano A x B = {concat(a,b)| per ogni a in A, per ogni b in B} (dove concat rappresenta
la concatenazione fra stringhe) e restituisca l'insieme risultante dall'applicazione del prodotto. 
Si noti che A x vuoto = vuoto x B = vuoto, e l'insieme vuoto  si rappresenta con {}. Se uno dei valori di input è undefined,
questo verrà trattato come un insieme vuoto.

Nota: per la rappresentazione degli elementi degli insiemi si utilizzi la notazione chiave:1*/

function prodotto(a,b){
    let res = {};
    if(a == undefined || b == undefined) return res;
    if(Object.keys(a).length == 0 || Object.keys(b).length == 0) return res;

    for(let key1 in a){
        for(let key2 in b){
            res[key1.concat(key2)] = 1;
        }
    }

    return res;
}


/*Si scriva una funzione JavaScript paripari(A) che, ricevuto un array di interi A, 
restituisca un nuovo array contenente solo gli elementi di A in posizione pari che sono pari, 
nello stesso ordine in cui compaiono in A.*/

function paripari(a){
    let res = [];
    for(let i = 0; i < a.length; i++){
        if(a[i]%2==0&&i%2==0) res.push(a[i])
    }
    return res;
}

/*Definire una funzione JS replace_filter_f(f,g), che prende in input una funzione f ed un predicato g,
ovvero una funzione g che restituisce un valore booleano quando viene invocata. replace_filter_f(f,g) deve restituire 
una nuova funzione che, preso in input un array A, prima applica la funzione f su ogni elemento di A e memorizza il risultato 
in un nuovo array B, poi filtra B creando un nuovo array C che contiene tutti i valori di B per cui g è falso, 
infine la funzione deve restituire C.
ATTENZIONE: L'array A non dev'essere modificato; l'array C deve preservare l'ordine degli elementi in A;
non si possono usare le funzioni map e filter di libreria.*/

// function replace_filter_f(f,g){
//     return function(a){
//         let b = [];
//         a.forEach(x => {b.push(f(x));});
//         let c = [];
//         b.forEach(x=>{if(!g(x))c.push(x);});
//         return c;
//     }
// }

function replace_filter_f(f,g){
    return function(a){
        return a.map(x => f(x)).filter(x=>!g(x));
    }
}

/*Si consideri una struttura di dati di tipo albero k-ario come visto a lezione,
rappresentato con oggetti JavaScript. Se i figli mancano, il campo figli è undefined.
Per i nodi foglia, val è un valore numerico. Per i nodi interni, val è una funzione con 
un parametro numerico e che restituisce un valore numerico.
A ogni nodo è inoltre associato un peso (NOTA: il peso di un nodo non è memorizzato in nessuna proprietà del nodo stesso).
Per le foglie il peso è uguale a val. Per calcolare il peso di un nodo interno, bisogna applicare la funzione memorizzata 
in val sulla somma dei pesi dei suoi nodi figli.
Si scriva una funzione javaScript valuta(t) che, dato un albero definito come sopra, restituisce il peso della radice.*/

function valuta(t){
    if(!t) return 0;
    if(t.figli == undefined || t.figli.length == 0) return t.val;
    return t.val(t.figli.reduce((sum,val) => sum + valuta(val),0))
}

t={val:Math.tanh,figli:[{val:3},{val:7},{val:-2},{val:8.5},{val:-6.5},{val:-10}]}

console.log(valuta(t))
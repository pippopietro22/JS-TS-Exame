/*Si definisca una funzione replace(arr,target,replacement) che dato un array arrritorni un array dove tutte le instanze di target
 sono sostituite dall'elemento replacement. 
 La funzione deve ritornare un nuovo array e non modificare quello passato come argomento*/

function replace(arr,target,replacement){
    return arr.map(x=> x==target ? replacement : x);
}

/*Si definisca una funzione contamaggioredi(arr,threshold) che dato un array arr 
ritorni il numero di elementi maggiori di threshold.*/

function contamaggioredi(arr,threshold){
    return arr.filter(x=>x > threshold);
}

/*Si definisca una funzione prodottoscalare(x,y)
che dati due array ne ritorni il prodotto scalare. Se gli array non hanno lo stesso numero di componenti,
la funzione ritorna undefined.*/

function prodottoscalare(x,y){
    if(x.length != y.length) return;
    return x.reduce((sum,val,i)=> sum + val*y[i],0);
}

/*Si definisca una funzione clip(arr,threshold, replacement)che dato un array arr ed una soglia threshold
ritorni un array dove ogni elemento superiore alla soglia è sostituito dal valore replacement.
Se l'argomento replacement è settato ad undefined, il valore è sostituito dalla soglia stessa. */

function clip(arr,threshold,replacement){
    return arr.map(x=> (x > threshold) ? ((replacement != undefined) ? replacement : threshold) : x);
}

/*Si scriva una funzione norma(v) che, dato un oggetto v con chiavi x e y con valore float, 
calcoli la norma euclidea del vettore e la aggiunga a v con chiave norma.*/

function norma(v){
    v["norma"] = Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2));
}

/*Si scriva una funzione ordnung(a) che, dato come argomento un array a, i cui elementi sono a loro volta array di numeri, 
ordini lo stesso a in modo che ogni singolo elemento sia ordinato in ordine numerico crescente, e che a sia ordinato in base 
al valore numerico crescente del primo elemento di ciascun elemento; a parità si passa a confrontare il secondo elemento, e così via.
In caso di parità di tutti gli elementi, l’array più corto va ordinato prima di quello più lungo. Questo è un esempio di ordinamento 
lessicografico, perché viene usato, per esempio nei dizionari, per ordinare le parole di una lingua.*/

function ordnung(a){
    a.forEach(x => x.sort(function(a,b){return a-b}));
    a.sort(function cmp2(a,b){
        if(a.length == 0 && b.length == 0) return 0;
        if(a.length == 0) return -1;
        if(b.length == 0) return 1;
        if(a[0] == b[0]) return cmp2(a.slice(1),b.slice(1));
        return a[0]-b[0];
    })
}


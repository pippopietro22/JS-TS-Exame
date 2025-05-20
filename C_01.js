/*Sia A un array, i cui elementi sono oggetti con due chiavi x e y a valori numerici (e potenzialmente altre chiavi). 
Si scriva una funzione JavaScript maxSum(A) che restituisca l'oggetto all'interno di A 
per cui è massima la somma dei valori di x e y. In caso di parità fra due elementi, la funzione restituisce il primo. 
Se l'array A è vuoto, la funzione deve restituire undefined.*/

function maxSum(a){
    if(a.length == 0) return;
    let max = -Infinity;
    let res;
    a.forEach(el=> {
        let sum = el.x +el.y;
        if(sum > max){
            max = sum;
            res = el;
        }
    });
    return res;
}

/*Siano f e g due funzioni dai naturali ai reali, e sia [a,b] un intervallo (chiuso sia a destra che a sinistra) sui naturali.
Si scriva una funzione JavaScript domina(f,g,a,b) che restituisce true se f(n)≥g(n) per ogni n in [a,b], e false in caso contrario.*/

function domina(f,g,a,b){
    for(let i = a; i <= b; i++){
        if(f(i) < g(i)) return false;
    }
    return true;
}

/*Si scriva una funzione JavaScript paren(n) che, dato come argomento un naturale n>0, 
restituisca una stringa composta da una coppia di parentesi intorno al numero 1, 
seguita da una doppia coppia intorno al numero 2, seguita da una tripla coppia intorno al numero 3, 
e così via fino a raggiungere n.*/

function paren(n){
    let res = "";
    for(let i = 1; i <= n; i++){
        let aux = String(i);
        for(let j = 1; j <= i; j++){
            aux = "("+aux+")";
        }
        res = res+aux;
    }
    return res;
}

/*Si consideri un linguaggio definito dalla seguente grammatica:

Exp ::= ε | Exp Cifra | Exp Op
Cifra ::= 0|1|2|3|4|5|6|7|8|9
Op ::= +|-
La valutazione di una stringa in questo linguaggio procede secondo le seguenti regole:

il valore di ε è 0
il valore di Exp Cifra è il valore di Exp a cui viene sommato il valore numerico della Cifra
il valore di Exp Op è il valore di Exp incrementato di 1 (se Op è +) o decrementato di 1 (se Op è -)
Si scriva una funzione JavaScript bogoval(s) che, data una stringa s appartenente al linguaggio definito sopra, 
restituisca il suo valore.*/

function bogoval(s){
    let res = 0;
    for(let i = 0; i < s.length; i++){
        switch(s[i]){
            case "+":
                res++;
                break;
            case "-":
                res--;
                break;
            default:
                if(s[i] >= '0' && s[i] <= 9) res+=Number(s[i]);
                break;
        }
    }
    return res;
}
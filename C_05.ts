/*Si scriva in TypeScript una dichiarazione di tipo (istruzione type) che dichiari il tipo SLLNode che rappresenta 
il nodo di una lista a collegamento singolo. Gli oggetti di questo tipo devono avere un campo val con valore qualsiasi, 
e un campo next per il collegamento al nodo successivo.
Si scriva poi una funzione sllLen(n) che, dato un nodo n di tipo SLLNode, restituisca la lunghezza della lista che inizia da n. 
Se n è null, la lunghezza deve essere 0.
Si curi di annotare il più precisamente possibile tutti i tipi.*/

type SLLNode = {
    val:any,
    next:SLLNode|null
};

function sllLen(n:SLLNode|null):number{
    if(n == null) return 0;
    return 1 + sllLen(n.next);
}

var n={ val:1, next: {val:2, next: {val:3, next:null}}}
console.log(sllLen(n),3)

/*Si scriva in TypeScript una classe Vec che rappresenta un vettore bidimensionale. La classe deve implementare:

- un costruttore, che prenda come argomento due valori numerici x e y (le componenti del vettore) e costruisca il vettore 
    corrispondente; una volta creato, i valori non possono più essere cambiati;
- un operatore sum(w) che somma il vettore corrente al vettore w e restituisce un nuovo vettore i cui componenti sono
    la somma dei rispettivi componenti dei due vettori;
- un operatore mul(a) che moltiplica il vettore corrente per lo scalare a e restituisce un nuovo vettore i cui componenti
    sono il prodotto dei rispettivi componenti per a;
- un operatore eq(w) che restituisce true se il vettore corrente e w rappresentano lo stesso vettore (pur essendo oggetti diversi);
- un operatore ax(a) che, dato un numero a, restituisce "x" se a è uguale alla componente x di questo vettore; 
    "y" se a è uguale alla componente y di questo vettore, "xy" se sia x che y sono uguali ad a, e undefined altrimenti;
- un campo statico zero il cui valore è il vettore con componenti 0,0;
- due proprietà a sola lettura, x e y che restituiscono rispettivamente il primo e il secondo elemento del vettore.*/



class Vec{
    #x:number;
    #y:number;
    constructor(x:number, y:number){
        this.#x = x;
        this.#y = y
    }

    get x():number{return this.#x;} 
    get y():number{return this.#y;}

    sum(w:Vec):Vec{
        return new Vec(this.x + w.x, this.y + w.y);
    }

    mul(a:number):Vec{
        return new Vec(this.x*a,this.y*a);
    }

    eq(w:Vec):boolean{
        if(this.x == w.x && this.y == w.y) return true;
        return false;
    }

    ax(a:number):"x"|"y"|"xy"|undefined{
        if(a == this.x && a == this.y) return "xy";
        if(a == this.y) return "y";
        if(a == this.x) return "x";
    }

    static zero = new Vec(0,0)
}

var v=new Vec(1,2)
var w=new Vec(3,4)
var r=new Vec(4,6)
var s=new Vec(9,12)
console.log(v.eq(w),false)
console.log(v.sum(w).eq(r),true)
console.log(w.mul(3).eq(s),true)
console.log(w.mul(5).eq(s),false)
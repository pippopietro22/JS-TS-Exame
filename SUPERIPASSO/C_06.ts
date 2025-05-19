/*Si consideri la rappresentazione dei grafi vista a lezione, in cui un oggetto Grafo ha due campi -- nodi e archi -- che
contengono, rispettivamente, un array di Nodi e un array di Archi. I Nodi hanno un campo label di tipo qualunque che rappresenta
il nome del nodo; gli archi (orientati) hanno due campi da e a che riferiscono rispettivamente il nodo di origine e il nodo di
destinazione dell'arco.

Si scrivano in TypeScript le classi Grafo, Nodo e Arco, e si implementino due metodi del Grafo: 
- matrAdj() che restituisce la matrice di adiacenza (o nodi-nodi, con i nodi origine sulle righe) del grafo; 
- matrInc() che restituisce la corrispondente matrice di incidenza (o nodi-archi, con i nodi sulle righe). 
Le matrici devono essere implementate come array di righe, in cui ciascuna riga è un array di valori -1, 0 o 1 
(in entrambi i casi, -1 indica "origine", 1 indica "destinazione" e 0 indica "assenza").
Gli indici di riga e colonna delle matrici corrispondono alla posizione che il nodo e l'arco hanno in nodi o archi. 
Per ottimizzare l'uso della memoria, è possibile lasciare a empty gli elementi dei vettori che non vengono usati 
(si intende che i valori empty verranno considerati come 0). 
Si ricordi che gli array in JavaScript e TypeScript sono, in realtà, hash table.*/

class Grafo{
    nodi:Nodo[];
    archi:Arco[];
    constructor(nodi:Nodo[],archi:Arco[]){
        this.nodi = nodi;
        this.archi = archi;
    }

    set_zero(mat:number[][],righe:number,colonne:number):void{
        for(let i = 0; i < righe; i++){
            mat.push([]);
            for(let j = 0; j < colonne; j++){
                mat[i].push(0);
            }
        }
    }

    matrAdj():number[][]{
        let res:number[][] =[];
        this.set_zero(res,this.nodi.length,this.nodi.length);
        for(let arc of this.archi){
            let origine:number = this.nodi.indexOf(arc.da);
            let arrivo:number = this.nodi.indexOf(arc.a);
            res[origine][arrivo] = -1;
            res[arrivo][origine] = 1;
        }
        return res;
    }

    matrInc():number[][]{
        let res:number[][] = [];
        this.set_zero(res,this.nodi.length,this.archi.length);
        for(let i:number = 0; i < this.archi.length; i++){
            let origine:number = this.nodi.indexOf(this.archi[i].da);
            let arrivo:number = this.nodi.indexOf(this.archi[i].a);
            res[origine][i] = -1;
            res[arrivo][i] = 1;
        }
        return res;
    }
}

class Nodo{
    label:any;
    constructor(name:any){
        this.label=name;
    }
}

class Arco{
    da:Nodo;
    a:Nodo;
    constructor(da:Nodo,a:Nodo){
        this.da = da;
        this.a = a;
    }
}

/*Uno span è una stringa di testo, in cui però dei segmenti possono essere in grassetto, o in corsivo, o sottolineati.
I segmenti di testo possono essere combinati in vari modi. Tutte le parti che non hanno uno stile particolare sono nello stile
"normale".
Si implementi in TypeScript una classe Span, che si comporta in tutti i contesti come una stringa, ma in più ha un metodo
setStyle con parametri a vostra discrezione per mettere in corsivo, grassetto o sottolineato dei segmenti (in un numero qualunque),
e un generatore toCode() che restituisce uno dopo l'altro i caratteri della stringa, ma anche i codici speciali (ispirati da HTML)
"<B>" e "</B>" (rispettivamente, inizio e fine grassetto), "<I>" e "</I>" (inizio e fine corsivo), "<U>" e "</U>" (inizio e fine
sottolineato) che indicano i cambi di stile. Per semplicità, non avremo dei metodi per rimuovere uno stile da un segmento una volta
impostato.*/

enum Stili{
    grassetto=1,
    corsivo=2,
    sottolineato=3
}

class Span extends String{
    arrGras:number[] = [];
    arrCors:number[] = [];
    arrSott:number[] = [];
    constructor(){
        super();
        for(let i:number = 0; i < this.length; i++){
            this.arrGras.push(0); 
            this.arrCors.push(0);
            this.arrSott.push(0);
        }
    }

    setSytle(inizio:number,fine:number,stile:Stili){
        switch(stile){
            case Stili.grassetto:
                for(let i:number = inizio; i <= fine; i++){
                    this.arrGras[i] = 1;
                }
                break;
            case Stili.corsivo:
                for(let i:number = inizio; i <= fine; i++){
                    this.arrCors[i] = 1;
                }
                break;
            case Stili.sottolineato:
                for(let i:number = inizio; i <= fine; i++){
                    this.arrSott[i] = 1;
                }
                break;
            default:
                break;
        }
    }

    *toCode(){
        for(let i:number = 0; i < this.length; i++){
            if(this.arrCors[i] == 1 && this.arrCors[i-1]==0) yield "<I>";
            if(this.arrGras[i] == 1 && this.arrGras[i-1]==0) yield "<B>";
            if(this.arrSott[i] == 1 && this.arrSott[i-1]==0) yield "<U>";
            yield this[i];
            if(this.arrSott[i] == 1 && this.arrSott[i+1]==0) yield "</U>";
            if(this.arrGras[i] == 1 && this.arrGras[i+1]==0) yield "</B>";
            if(this.arrCors[i] == 1 && this.arrCors[i+1]==0) yield "</I>";
        }
    }
}


/*Chiamiamo scalabili tutti gli oggetti che possono essere moltiplicati per uno scalare (ovvero, un numero), 
restituendo un oggetto (dello stesso tipo) che è in qualche senso il risultato della moltiplicazione. 
Per esempio, una stringa potrebbe essere scalabile, con la convenzione che 3 ×("x") = ("xxx"); anche un intervallo 
temporale potrebbe essere scalabile, con la convenzione che 3 × (1 mese) = (3 mesi), ecc. In TypeScript, definiamo che 
questa particolare moltiplicazione si faccia invocando su un oggetto il metodo scaleBy(alfa) che restituisce un altro 
oggetto dello stesso tipo.
Analogamente, chiamiamo comparabili tutti gli oggetti che possono essere confrontati con altri oggetti dello stesso tipo, 
secondo un qualche ordinamento (totale) <. Per esempio, uno studente A potrebbe essere comparato con uno studente B, 
secondo il criterio che A < B <-> cfu(a) < cfu(B). In TypeScript, definiamo che questo confronto si faccia invocando il metodo 
lessThan(X) su un oggetto.

Si scriva dunque una funzione intRatio(A,B) che, dati due oggetti A e B che siano sia scalabili che comparabili, 
restituisca il loro rapporto, definito come segue: se A < B, allora il risultato è il massimo alfa in N tale che alfa x A < B e 
(alfa + 1) z A >= B; altrimenti, il risultato è 1/beta, dove beta = intRatio(B,A).*/

interface tipo{
    scaleBy(a:number):tipo;
    lessThan(x:tipo):boolean;
}

function intRatio<T extends tipo>(a:T,b:T):number{
    if(a.lessThan(b)){
        let i = 0;
        while(a.scaleBy(i).lessThan(b)) i++;
        return i;
    }else{
        return 1/intRatio(b,a);
    }
}
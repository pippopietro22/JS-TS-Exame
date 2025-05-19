/*Dato un array di numeri A, un segmento oscillante di A è un sotto-array di A formato da almeno 2 elementi contigui di A 
con segno alternato. Per esempio, nell'array [ 4, 5, -2, 7, -5, 2, 1, -1] sono segmenti 
oscillanti [5, -2], [5, -2, 7], [5, -2, 7, -5], [5, -2, 7, -5, 2], [-2, 7, -5, 2], [7, -5], [-2, 7, -5], [1, -1], ecc. 
Notate che ogni sotto-array (di lunghezza almeno 2) di un segmento oscillante è a sua volta segmento oscillante. 
Un segmento oscillante è massimale se non è contenuto in alcun altro segmento oscillante. Nel nostro esempio, sono segmenti 
oscillanti massimali: [5, -2, 7, -5, 2] e [1, -1]. È garantito che A non contenga 0 (più precisamente: né +0 né -0, che in 
JavaScript sono distinti).

Si scriva una funzione JavaScript som(A) che, dato un array di numeri A, restituisca un array di coppie [inizio, fine] 
dove inizio e fine sono, rispettivamente, gli indici a cui inizia e finisce ogni segmento oscillante massimale di A (estremi inclusi). 
Nel nostro esempio, la funzione deve restiture le coppie [1,5] e [6,7]. L'array risultante deve essere ordinato per indici di 
inizio crescenti.*/

function som(a){
    let res= [];
    for(let i = 0; i < a.length; i++){
        let inizio = i;
        while(a[i]*a[i + 1] < 0 && i < a.length)i++;
        let fine = i;
        if(inizio != fine) res.push([inizio,fine]);
    }
    return res;
}



/*Vogliamo scrivere un interprete per il linguaggio bin. In bin, ogni istruzione ha la forma <destinazione> <comando> <operandi>, 
in cui la destinazione è un nome di variabile (una stringa), gli operandi sono nomi di variabile oppure i letterali 0 e 1, 
separati da spazi per i comandi che hanno più operandi, e il comando è uno fra: EQ, AND, OR, XOR, NOT con l'ovvio significato. 
Il programma è fornito sotto forma di stringa, con una istruzione su ogni riga (le righe sono separate dal carattere a-capo). 
Le righe vengono eseguite in ordine, dalla prima all'ultima. I commenti sono introdotti dal carattere % e si estendono fino a 
fine riga. Come di consueto, gli spazi bianchi non sono significativi (salvo dove servono da separatori).

Si scriva in JavaScript un interprete bin, sotto forma di funzione intbin(prog) che, dato un programma prog, 
restituisca un array di variabili che alla fine dell'esecuzione hanno il valore 1. L'array deve essere ordinato 
in ordine lessicografico. Se il programma tenta di accedere a una variabile che non è mai stata assegnata, o tenta di 
eseguire un comando non definito, la funzione deve lanciare un'eccezione (a vostra scelta).


Esempio
Sia P il programma seguente:
x EQ 0 % assegna 0 a x
y EQ 1 % assegna 1 a y
z1 OR x y % assegna 1 (x or y) a z1
qq NOT x % assegna 1 (not x) a qq
wrd AND x qq % assegna 0 (x and qq) a wrd
y XOR z1 qq % assegna 0 (z1 xor qq) a y

allora, intbin(P) restituisce l'array ["qq","z1"].*/

class EccezioneAVostraScelta extends Error{}

function intbin(prog){
    let res = [];
    let vars = {"1":1, "0":0};

    let lines = prog.trim().split("\n").map(line => line.split("%")[0].trim()).filter(line => line !== "");
    for(line of lines){
        let words = line.split(" ");
        let dest = words.shift();
        let cmd = words.shift();
        let ops = words.map(x => (x == "1" || x == "0") ? Number(x) : ((x in vars) ? vars[x] : "Errore"))
        ops.forEach(x => {if(x == "Errore") throw new EccezioneAVostraScelta()})
        esegui(dest,cmd,ops,vars);
    }

    for(let key in vars){
        if(key == "1") continue;
        if(vars[key] == 1) res.push(key);
    }

    res.sort(function(a,b){
        if(a > b) return 1;
        return -1;
    })
    return res;
}

function esegui(dest,cmd,ops,vars){
    switch(cmd){
        case "EQ":
            vars[dest] = ops[0];
            break;
        case "NOT":
            vars[dest] = !ops[0];
            break;
        case "AND":
            vars[dest] = ops[0] & ops[1];
            break;
        case "OR":
            vars[dest] = ops[0] | ops[1];
            break;
        case "XOR":
            vars[dest] = ops[0] ^ ops[1];
            break;
        default:
            throw new EccezioneAVostraScelta();
    }
}
function mostrarMaior(n1,n2){
    if(n1>n2){
        var maior= n1
    } else if (n1<n2){
        var maior = n2
    }else{
        var maior = "Números iguais"
    }
    console.log(maior)
}

var n1 = 10
var n2 = 5

mostrarMaior(n1,n2)
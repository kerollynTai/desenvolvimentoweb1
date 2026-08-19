function verificarNumero(n1){
    var verificacao = n1%2

    if(verificacao==0){
        verificacao = "O número digitado é par"
    }else{
        verificacao = "O numero digitado é ímpar"
    }
    console.log(verificacao)
}

var n1 = 15

verificarNumero(n1)
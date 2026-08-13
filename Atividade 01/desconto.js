function calcularDesconto(preco,porcentagem){
    var precoFinal= preco-((porcentagem/100)*preco)
    console.log(precoFinal)
}

var preco = 100
var desconto = 10

calcularDesconto(preco,desconto)
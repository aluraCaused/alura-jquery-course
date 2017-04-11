$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
	$("#spinner").toggle();
	$.get("http://localhost:3000/frases",trocaFraseAleatoria)
	.fail(exibeErro).
	always(function(){
		$("#spinner").toggle();
	});
}

function trocaFraseAleatoria(data){
	var frase = $(".frase");

	var numeroAleatorio = Math.floor(Math.random() * data.length);

	frase.text(data[numeroAleatorio].texto);
	var tempo = data[numeroAleatorio].tempo;

	atualizaTamanhoFrase();
	atualizaTempoInicial(tempo);

}

function buscaFrase(){

	$("#spinner").toggle();
	var fraseId = $("#frase-id").val();
	var dados = {id:fraseId};
	console.log(dados);
	$.get("http://localhost:3000/frases",dados,trocaFrase)
	.fail(exibeErro)
	.always(function(){
		$("#spinner").toggle();
	})
}

function trocaFrase(data){
	$(".frase").text(data.texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data.tempo);
}

function exibeErro(){
	$("#erro").fadeIn();

	setTimeout(function(){
		$("#erro").fadeToggle();
	}, 1500)
};

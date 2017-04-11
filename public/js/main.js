var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();
$(function(){

	iniciarJogo();
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciarJogo);
	atualizaPlacar();
	$("#usuarios").selectize({
    create: true,
    sortField: 'text'
	});
	$(".tooltip").tooltipster({
		trigger:"custom"
	});
});


function atualizaTamanhoFrase(){
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;

	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo){
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo);
}

function inicializaContadores(){

	campo.on("input", function(){

		var conteudo = campo.val();

		var qtdePalavras = conteudo.split(/\S+/).length-1;
		$("#contador-palavras").text(qtdePalavras);

		var qtdeCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdeCaracteres);
		$("#botao-reiniciar").attr("disabled",true);

	});
}




function iniciarJogo(){
	campo.one("focus", function(){
		var tempoRestante = $("#tempo-digitacao").text();
		var cronometroId = setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				clearInterval(cronometroId);
				finalizaJogo();
			}
		}, 1000);
	});
}

function finalizaJogo(){

	campo.attr("disabled", true);
	campo.toggleClass("campo-desabilitado");
	$("#botao-reiniciar").attr("disabled",false);
	inserePlacar();

}

function reiniciarJogo(){
	var palavras = $("#contador-palavras").text();
	var recorde = $("#recorde-palavras").text();

		if(palavras > recorde){
			$("#recorde-palavras").text(palavras);
		}

	$("#tempo-digitacao").text(tempoInicial);
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text(0);
	$("#contador-caracteres").text(0);
	campo.removeClass("campo-desabilitado");
	campo.removeClass("campo-correto");
	campo.removeClass("campo-errado")
	iniciarJogo();

}

function inicializaMarcadores(){

campo.on("input", function(){
	var frase = $(".frase").text();
	var digitado = campo.val();
	var comparavel = frase.substr(0, digitado.length);

		if(digitado == comparavel){
			campo.addClass("campo-correto");
			campo.removeClass("campo-errado");
		}else{
			campo.addClass("campo-errado");
			campo.removeClass("campo-correto");
		}

	})
}

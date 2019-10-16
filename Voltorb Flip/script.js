let nivel = 1;
let gameOver = false;
let win;
let jogar = false;
const inputScoreTotal = document.getElementById("inputScoreTotal");
const inputScoreAtual = document.getElementById("inputScoreAtual");

//define o numero de bombas e pontos baseado no nivel
function geraNivel(){
	let bombas, x2, x3;

	switch(nivel){
		case 1: {
			x3 = Math.floor(Math.random() * 3);
			break;
		}
		case 2: {
			x3 = Math.floor(Math.random() * 2) + 1;
			break;
		}
		case 3: {
			x3 = Math.floor(Math.random() * 2) + 2;
			break;
		}
		case 4: {
			x3 = 2;
			break;
		}
		case 5: {
			x3 = Math.floor(Math.random() * 2) + 3;
			break;
		}
		case 6: {
			x3 = Math.floor(Math.random() * 3) + 3;
			break;
		}
		case 7: {
			x3 = 4;
			break;
		}
	}

	//uma lógica que eu criei pra definir quantidade de x1, x2, x3 e bombas baseado no nivel.
	x2 = (nivel + 4) - x3;
	bombas = nivel + 5;
	let nivelInfo = {
		x2: x2,
		x3: x3,
		bombas: bombas
	}
	return nivelInfo;
}

//cria e popula o tabuleiro
function geraJogo(){
	document.getElementById("level").innerHTML = `Level ${nivel}`;
	score(0);

	//uma array com 5 arrays dentro, forma uma matriz
	let tabuleiro = [[],[],[],[],[]];

	//repete 5 vezes cada, vai formar uma matriz 5x5 e colocar valor 0 em todos os campos (pra facilitar a visualização)
	for(let x in tabuleiro){
		for(let y in tabuleiro){
			tabuleiro[x][y] = 0;
		}
	}

	let nivelInfo = geraNivel();

	//Coloca x2, x3 e bombas aleatoriamente na array tabuleiro.
	function preencheTabuleiro(num, nome){
		for(let i = 0; i < num; i++){
			let linha;
			let coluna;
			let ok;
			do {
				linha = random(5);
				coluna = random(5);
				//verifica se o local gerado tem algum valor, como eu coloquei 0 em todos, se tiver 0 pode mudar
				if(tabuleiro[linha][coluna] == 0){
					tabuleiro[linha][coluna] = nome;
					ok = true;
				}
				//caso ja tenha um valor (1, 2, 3 ou BM que é bomba não troca o valor)
				else {
					ok = false;
				}
			}
			//repete até que encontre um local que não tenha valor 
			while (ok == false);
		}
	}

	//chama a função dando os parametros o numero que é gerado pelo nivel e o valor que vai ser colocado na array
	preencheTabuleiro(nivelInfo.x2, 2);
	preencheTabuleiro(nivelInfo.x3, 3);
	preencheTabuleiro(nivelInfo.bombas, "BM");

	for(let x in tabuleiro){
		for(let y in tabuleiro){
			if(tabuleiro[x][y] == 0){
				tabuleiro[x][y] = 1;
			}
		}
	} 

	//cria o tabuleiro na tela adicionando suas respectivas imagens.
	function geraTabuleiro(){
		const divGame = document.getElementsByClassName("game");
		for(let x = 0; x < 6; x++){
			for(let y in tabuleiro){
				let divCelula = document.createElement("div");
				divGame[0].appendChild(divCelula);
				divCelula.classList.add("celula");

				//gambiarra, a ultima celula de cada linha tem que ser a celula da quantidade de numero e voltorb
				if(x == 5){
					divCelula.classList.add("info");
					//continue faz com que o for passe pra proxima repetição
					continue;
				}

				divCelula.classList.add("divCard");

				let imagem = document.createElement("img");

				//adiciona as imagens nas celulas
				if(tabuleiro[x][y] == 1){
					imagem.setAttribute("src","imagens/x1.png");
					imagem.classList.add("x1", "card");
				}
				if(tabuleiro[x][y] == 2){
					imagem.setAttribute("src","imagens/x2.png");
					imagem.classList.add("x2", "card");
				}
				if(tabuleiro[x][y] == 3){
					imagem.setAttribute("src","imagens/x3.png");
					imagem.classList.add("x3", "card");
				}
				if(tabuleiro[x][y] == "BM"){
					imagem.setAttribute("src","imagens/voltorb.png");
					imagem.classList.add("BM", "card");
				}

				//esconde as imagens até que seja clicado
				imagem.setAttribute("hidden", "true");
				divCelula.addEventListener("click", function(){
					jogar(imagem);
				});

				divCelula.appendChild(imagem);
			}

			if(x == 5){
				continue;
			}
			let divCelula = document.createElement("div");
			divGame[0].appendChild(divCelula);
			divCelula.classList.add("celula");
			divCelula.classList.add("info");
		}




		//Coloca a soma das linhas e colunas e a quantidade de bombas.
		let divInfo = document.getElementsByClassName("info");
		for(let x in divInfo){
			let bombCont = 0;
			let soma = 0;
			if(x < 5){
				for(let y in tabuleiro){
					if(tabuleiro[x][y] == "BM"){
						bombCont += 1;
					} else {
						soma += tabuleiro[x][y];
					}
				}
			} else {
				for(let i = 0; i < 5; i++){
					if(tabuleiro[i][x - 5] == "BM"){
						bombCont += 1;
					} else {
						soma += tabuleiro[i][x - 5];
					}
				}
			}

			//coloca os backgrounds coloridos
			if(x == 0 || x == 5){
				divInfo[x].style = "background-image: url(\"imagens/infoOrange.png\")";
			}
			if(x == 1 || x == 6){
				divInfo[x].style = "background-image: url(\"imagens/infoGreen.png\")";
			}
			if(x == 2 || x == 7){
				divInfo[x].style = "background-image: url(\"imagens/infoBlue.png\")";	
			}
			if(x == 3 || x == 8){
				divInfo[x].style = "background-image: url(\"imagens/infoPink.png\")";
			}
			if(x == 4 || x == 9){
				divInfo[x].style = "background-image: url(\"imagens/infoGray.png\")";
			}

			//coloca os valores da soma dos numeros e da quantidade de bombas na celula de informação
			divInfo[x].innerHTML = `<p>${soma}</p><p>${bombCont}<p>`;
		}
	}

	//retira o atributo hidden das imagens
	function jogar(imagem){
		if(gameOver == true || jogar == false){
			console.log("damn skaarl!");
			return;
		}
	
		imagem.removeAttribute("hidden");
		imagem.classList.add("untap");
		const card = document.getElementsByClassName("card");

		//vericica se todos x2 e x3 ja foram desvirados
		for(let i = 0; i < 25; i++){
			win = true;
			if(card[i].classList.contains("x2") && !(card[i].classList.contains("untap"))){
				win = false;
				break;
			}
			else if(card[i].classList.contains("x3") && !(card[i].classList.contains("untap"))){
				win = false;
				break;
			}
		}

		if(imagem.classList.contains("x2")){
			score(2);
		}
		else if(imagem.classList.contains("x3")){
			score(3);
		}
		//seta o game over
		else if(imagem.classList.contains("BM")){
			inputScoreTotal.value = Number(inputScoreTotal.value) + Number(inputScoreAtual.value);
			gameOver = true;
			voltorb(imagem);
			nivel = 1;
		}

		if(win == true){
			desviraCards();
			setTimeout(function(){
				document.getElementById("continue").removeAttribute("hidden");
			}, 2500)
			inputScoreTotal.value = Number(inputScoreTotal.value) + Number(inputScoreAtual.value);
			jogar == false;
			if(nivel != 7){
				nivel++;	
			}
		}

	}
	
	
	geraTabuleiro();
	
	console.log(nivelInfo);
	console.log(tabuleiro);
}

function desviraCards(){
	const card = document.getElementsByClassName("card");
	for(let i = 0; i < 25; i++){
		card[i].removeAttribute("hidden");
	}
}

function voltorb(imagem){
	const explosion = document.createElement("img");
	explosion.setAttribute("src", "imagens/explosion.gif");
	explosion.id = "explosion";
	imagem.parentNode.appendChild(explosion);
	
	setTimeout( function() {
		explosion.parentNode.removeChild(explosion);
		imagem.setAttribute("src", "imagens/voltorbFainted.png");
		desviraCards();
	}, 1000 );
	setTimeout( function(){
		document.getElementById("gameOver").removeAttribute("hidden");
	}, 2500);
}

function newGame(btn){
	btn.parentNode.setAttribute("hidden", "true")
	if(gameOver == true){
		inputScoreTotal.value = 0;
		gameOver = false;
	}
	win = false;
	const divGame = document.getElementsByClassName("game")[0];
	divGame.innerHTML = "";
	geraJogo();
}

function score(quant){
	if(quant == 0){
		inputScoreAtual.value = 0;
	}
	if(inputScoreAtual.value == 0){
		inputScoreAtual.value = quant;
	} else {
		inputScoreAtual.value *= quant;
	}
}

//cria numeros randomicos
function random(max){
	return Math.floor(Math.random() * max);
}

//chama a função geraJogo quando carregar a tela
window.onload = function(){
	geraJogo();
}
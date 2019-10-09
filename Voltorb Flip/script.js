let nivel = 1;
let gameOver = false;

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
	let tabuleiro = [[],[],[],[],[]];

	for(let x in tabuleiro){
		for(let y in tabuleiro){
			tabuleiro[x][y] = 0;
		}
	}

	let nivelInfo = geraNivel();

	//Coloca x2, x3 e bombas aleatoriamente.
	function preencheTabuleiro(num, nome){
		for(let i = 0; i < num; i++){
			let linha;
			let coluna;
			let ok;
			do {
				linha = random(5);
				coluna = random(5);
				if(tabuleiro[linha][coluna] == 0){
					tabuleiro[linha][coluna] = nome;
					ok = true;
				} else {
					ok = false;
				}
			} while (ok == false);
		}
	}

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

				if(x == 5){
					divCelula.classList.add("info");
					continue;
				}

				let imagem = document.createElement("img");

				if(tabuleiro[x][y] == 1){
					imagem.setAttribute("src","imagens/x1.png");
				}
				if(tabuleiro[x][y] == 2){
					imagem.setAttribute("src","imagens/x2.png");
				}
				if(tabuleiro[x][y] == 3){
					imagem.setAttribute("src","imagens/x3.png");
				}
				if(tabuleiro[x][y] == "BM"){
					imagem.setAttribute("src","imagens/voltorb.png");
				}

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
			divInfo[x].innerHTML = `<p>${soma}</p><p>${bombCont}<p>`;
		}
	}


	geraTabuleiro();

	console.log(nivelInfo);
	console.log(tabuleiro);
}

//cria numeros randomicos
function random(max){
	return Math.floor(Math.random() * max);
}

window.onload = function(){
	geraJogo();
}
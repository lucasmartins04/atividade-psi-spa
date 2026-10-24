const app = document.getElementById("app");

let tipoAtual = "";

async function mostrarPokemon(nome) {

    const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome}`
    );

    const dados = await resposta.json();

    app.textContent = "";

    const voltar = document.createElement("button");

    voltar.textContent = "← Voltar";

    voltar.onclick = function () {
        mostrarPokemons(tipoAtual);
    };

    app.appendChild(voltar);

    const titulo = document.createElement("h1");

    titulo.textContent = dados.name;

    app.appendChild(titulo);

    const imagem = document.createElement("img");

    imagem.src =
        dados.sprites.other["official-artwork"].front_default;

    imagem.alt = dados.name;

    app.appendChild(imagem);

    const altura = document.createElement("p");

    altura.textContent = "Altura: " + dados.height;

    app.appendChild(altura);

    const peso = document.createElement("p");

    peso.textContent = "Peso: " + dados.weight;

    app.appendChild(peso);

    const tipo = document.createElement("p");

    tipo.textContent =
        "Tipo: " + dados.types[0].type.name;

    app.appendChild(tipo);
}

async function mostrarPokemons(tipo) {

    tipoAtual = tipo;

    const resposta = await fetch(
        `https://pokeapi.co/api/v2/type/${tipo}`
    );

    const dados = await resposta.json();

    app.textContent = "";

    const titulo = document.createElement("h2");

    titulo.textContent =
        "Pokémons do tipo " + tipo;

    app.appendChild(titulo);

    const voltar = document.createElement("button");

    voltar.textContent = "Tipos";

    voltar.onclick = function () {
        carregarTipos();
    };

    app.appendChild(voltar);

    dados.pokemon.forEach(item => {

        const botaoPokemon =
            document.createElement("button");

        botaoPokemon.textContent =
            item.pokemon.name;

        botaoPokemon.onclick = function () {

            mostrarPokemon(
                item.pokemon.name
            );

        };

        app.appendChild(botaoPokemon);

    });

}

async function carregarTipos() {

    const resposta = await fetch(
        "https://pokeapi.co/api/v2/type"
    );

    const dados = await resposta.json();

    app.textContent = "";

    const titulo = document.createElement("h1");

    titulo.textContent =
        "Escolha um Tipo";

    app.appendChild(titulo);

    dados.results.forEach(tipo => {

        if (
            tipo.name === "unknown" ||
            tipo.name === "stellar"
        ) {
            return;
        }

        const botao =
            document.createElement("button");

        botao.textContent =
            tipo.name;

        botao.onclick = function () {

            mostrarPokemons(tipo.name);

        };

        app.appendChild(botao);

    });

}

carregarTipos();
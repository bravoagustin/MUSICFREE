@import url('https://fonts.googleapis.com/css2?family=Oxygen&display=swap');

*{
    box-sizing: border-box;
}

body {
    font-family: "Montserrat", sans-serif;
    background-color: black;
    color: blanchedalmond;
}

header form button {
    cursor: pointer;
}

input {
    outline: none;
    box-shadow: 1px 1px 1px blanchedalmond;
    padding: 12px;
    font-size: 16px;
    border: none;
}

input:focus {
    outline: none;
}

header {
    background-image: url("https://image.freepik.com/foto-gratis/mujer-joven-sonriente-bailando-sosteniendo-telefono-inteligente-escuchando-musica-auriculares_291650-287.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 45vh;
    position: relative;
}

header::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0;
    background: rgb(0, 0, 0, 0.418);
    mix-blend-mode: color-dodge;
}

header * {
    z-index: 10;
}

header h1 {
    margin: 15px;
    -webkit-text-stroke: 1px rgb(246, 243, 243);
    font-size: 40px;
}

#form {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#form input {
    border: 0;
    width: 100%;
    background: white;
    padding: 15px;
    border-radius: 30px;
    margin-bottom: 20px;
}

.masResultados {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

button {
width: 80px;
border-radius: 15px;
padding: 10px;
border: none;
outline: none;
background: linear-gradient(350deg, #682830 0%, #a03f4c 100%);
font-size: 15px;
color: black;
margin: 15px;
cursor: pointer;
}

#form button {
    width: 30%;
    border-radius: 15px;
    padding: 15px;
    border: none;
    outline: none;
    background: linear-gradient(350deg, #ffdde1 0%, #ee9ca7 100%);
    font-size: 20px;
}

.resultados {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px;
    flex-direction: column;
}

.resultados ul {
    width: 100%;
    list-style: none;
}

.resultados ul li {
    list-style: none;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
}

.resultado ul li p {
    width: 50%;
    max-width: 50%;
}

audio {
    height: 30px;
    max-width: 50%;
}

nav {
    width: 100%;
    height: 50px;
    background: rgb(187, 165, 165);
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 50;
    color: white
}


@media screen and (max-width: 500px) {
    .resultados ul li {
        flex-direction: column;
    }
    .resultados {
        width: 100%;
        padding: 30px;
    }
    .resultado ul li p {
        width: 100%;
        max-width: 100%;
        margin: 10px 0;
    }
    audio {
        width: 100%;
        max-width: 100%;
    }
    #form button {
        width: 60%;
    }
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music free</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <nav>www.musicfree.com</nav>
    <header>
        <h1>Music Free.</h1>
        <form id="form">
            <input 
            type="search" 
            name="search" 
            id="search"
            placeholder="Busca tu canción o artista favorito" 
            class="search">
            <button>Buscar</button>
        </form>
    </header>

    <div class="resultados" id="resultados">
        <p>Tu musica a un click de distancia.</p>
        <!--<ul>
            <li>
                <span>
                    <strong>Cancion Uno</strong>
                </span>
            </li>
        </ul>
    </div>-->

    <div class="masResultados">
    </div>

    <script src="index.js"></script>

</body>
</html>

//js
const form = document.getElementById("form");
const search = document.getElementById("search");
const resultados = document.getElementById("resultados");
const botonesMasMenos = document.querySelector(".masResultados");

const URL = "https://api.lyrics.ovh";

// Funcion de buscar canciones
const getSongs = (value) => {
    fetch(`${URL}/suggest/${value}`)
    .then((valor) => valor.json())
    .then((resultado) => pintarCanciones(resultado))
    .catch((error) => console.log(error));
};

// Funcion de mostrar
const pintarCanciones = (resultado) => {
    console.log(resultado);
    const canciones = `
    <h1> Busquedas relacionadas a ${search.value} </h1>
    <ul> 
    ${resultado.data
     .map( 
        (valor) => `
    <li> 
        <p>${valor.artist.name} - ${valor.title}</p>
        <audio controls>
            <source src=${valor.preview} type="audio/mpeg">
        </audio>
         </li>
    `
        )
    .join("")}
  </ul>`;
    resultados.innerHTML = canciones;

        if (resultado.next || resultado.prev) {
            botonesMasMenos.innerHTML = `
            ${resultado.prev ? `<button onclick="hacealgo(${resultado.prev})">Anterior</button>` : ``}
            ${resultado.next ? `<button onclick="hacealgo(${resultado.next})">Siguiente</button>` : ``}
            `;
        }
};

function haceAlgo(url) {
console.log(url)
};

// Funcion de iniciar
//Get songs

const iniciar = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const paraBuscar = search.value;

        if (!paraBuscar) {
            return;
        }

        getSongs(paraBuscar);
    });
};

iniciar();

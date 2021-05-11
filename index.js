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
}

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
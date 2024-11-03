
const apiKey = "DEMO_KEY"; 
let fechaActual = "2015-07-02";
let paginaActual = 1;


async function buscarFotos() {
    fechaActual = document.getElementById("fechaTierra").value; 
    paginaActual = 1;
    cargarFotos(); 
}


async function cargarFotos() {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${fechaActual}&api_key=${apiKey}&page=${paginaActual}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    mostrarResultados(datos.photos);
    if (datos.photos.length > 0) {
        mostrarDetalle(datos.photos[0]);
    }
}


function mostrarResultados(fotos) {
    const tabla = document.getElementById("resultadoFotos");
    tabla.innerHTML = "";

    fotos.forEach((foto) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${foto.id}</td>
            <td>${foto.rover.name}</td>
            <td>${foto.camera.name}</td>
            <td><button onclick="mostrarDetalle(${JSON.stringify(foto)})">More</button></td>
        `;

        tabla.appendChild(fila);
    });
}


function mostrarDetalle(foto) {
    document.getElementById("fotoDetalle").src = foto.img_src;
    document.getElementById("infoDetalle").innerText = `Id: ${foto.id} Martian sol: ${foto.sol} Earth date: ${foto.earth_date}`;
}


function paginaSiguiente() {
    paginaActual++;
    cargarFotos();
}


function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        cargarFotos();
    }
}


window.onload = cargarFotos;

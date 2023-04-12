//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //reseteamos carrito
    limpiarHTML();
  });
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

//Elimina un objeto del carrito

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina el arreglo del carrito
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); //pinta de nuevo el carrito
  }
}

//Lee el contenido HTML
function leerDatosCurso(curso) {
  //Crear un objeto

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisar si un elemento ya existe en el carrito

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retomar el objeto actualizado
      } else {
        return curso; //retoma los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Agregar los elementos al arreglo carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

//Muestra carrito
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();
  //Recorre el carrito
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `

    <td>
<img src="${imagen}" width="100">

    </td>
<td>
${titulo}

</td>

<td>
${precio}
</td>

<td>
${cantidad}
</td>

<td>

<a href="#" class="borrar-curso" data-id="${id}"> X</a>

</td>
`;

    //Agrega html del carrito al tbody

    contenedorCarrito.appendChild(row);
  });
}

//Elimina los curos del tbody
function limpiarHTML() {
  //Forma lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

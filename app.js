const productos = [
  { id: 1, nombre: "Remera", categoria: "ropa", precio: 5000 },
  { id: 2, nombre: "Zapatillas", categoria: "calzado", precio: 15000 },
  { id: 3, nombre: "Gorra", categoria: "accesorios", precio: 2500 },
  { id: 4, nombre: "Campera", categoria: "ropa", precio: 10000 },
  { id: 5, nombre: "Botines", categoria: "calzado", precio: 12000 }
];

// Elementos del DOM
const lista = document.getElementById("lista-productos");
const filtros = document.getElementById("filtros");

// Mostrar filtros
const categorias = [...new Set(productos.map(p => p.categoria))];
filtros.innerHTML = `<button onclick="mostrarProductos()">Todos</button>`;
categorias.forEach(cat => {
  const btn = document.createElement("button");
  btn.textContent = cat;
  btn.onclick = () => mostrarProductos(cat);
  filtros.appendChild(btn);
});

// Mostrar productos según categoría
function mostrarProductos(categoria = "") {
  lista.innerHTML = "";

  const filtrados = categoria ? productos.filter(p => p.categoria === categoria) : productos;

  filtrados.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    lista.appendChild(div);
  });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    listaCarrito.appendChild(li);
  });
}

mostrarProductos();
mostrarCarrito();

const formulario = document.getElementById("formulario-contacto");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // evita que se recargue la página

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const texto = document.getElementById("mensaje-texto").value.trim();

  if (!nombre || !email || !texto) {
    mensaje.textContent = "Por favor, completá todos los campos.";
    mensaje.style.color = "red";
    return;
  }

  // Si está todo bien
  mensaje.textContent = "Mensaje enviado correctamente ✅";
  mensaje.style.color = "green";

  // Resetear el formulario
  formulario.reset();
});
// ===============================

// TMM Business Intelligence Portal

// Login v2.0

// ===============================

const usuarios = [

    { usuario: "Admin", password: "12345", nombre: "Administrador" },

    { usuario: "Juan", password: "abc123", nombre: "Juan Montes" },

    { usuario: "Felipe", password: "tmm2026", nombre: "Felipe Munguía" },

    { usuario: "Supervisor", password: "vw123", nombre: "Supervisor" }

];

// Recordar el último usuario

window.onload = function () {

    const ultimoUsuario = localStorage.getItem("usuario");

    if (ultimoUsuario) {

        document.getElementById("usuario").value = ultimoUsuario;

    }

    // Mostrar / ocultar contraseña

    const boton = document.getElementById("mostrarPassword");

    if (boton) {

        boton.addEventListener("click", function () {

            const pass = document.getElementById("password");

            if (pass.type === "password") {

                pass.type = "text";

                this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                pass.type = "password";

                this.innerHTML = '<i class="fa-solid fa-eye"></i>';

            }

        });

    }

    // Entrar con Enter

    document.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            login();

        }

    });

};

function login() {

    let usuario = document.getElementById("usuario").value.trim();

    let password = document.getElementById("password").value.trim();

    let acceso = usuarios.find(u =>

        u.usuario === usuario &&

        u.password === password

    );

    if (acceso) {

        localStorage.setItem("usuario", acceso.usuario);

        localStorage.setItem("nombre", acceso.nombre);

        window.location.href = "index.html";

    } else {

        document.getElementById("mensaje").innerHTML =

            "❌ Usuario o contraseña incorrectos.";

    }

}
 
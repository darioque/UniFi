window.addEventListener("load", function () {
    const formulario = document.querySelector("form.login-form");
    const email = document.querySelector("input.email");
    const password = document.querySelector("input.password");
    const ulErrores = document.querySelector("div.errores ul");

    formulario.addEventListener("submit", function (e) {
        let errores = [];
        ulErrores.innerHTML = "";

        if (email.value == "") {
            errores.push("You must enter an email or a username");
        }

        if (password.value.length < 8) {
            errores.push("The password must have at least 8 characters");
        }

        if (errores.length > 0) {
            e.preventDefault();

            ulErrores.classList.add("no-list");

            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
            }
        }
    });
});

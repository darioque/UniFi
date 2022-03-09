window.addEventListener("load", function () {
    const formulario = document.querySelector("form.login-form");
    const email = document.querySelector("input.email");
    const firstName = document.querySelector("input.first_name");
    const lastName = document.querySelector("input.last_name");
    const username = document.querySelector("input.user_name");
    const password = document.querySelector("input.password");
    const ulErrores = document.querySelector("div.errores ul");

    formulario.addEventListener("submit", function (e) {
        let errores = [];
        ulErrores.innerHTML = ''
        if (email.value == "") {
            errores.push("You must enter an email");
        }

        if (firstName.value == "") {
            errores.push("You must enter your first name");
        }

        if (lastName.value == "") {
            errores.push("You must enter your last name");
        }

        if (username.value.length < 6 && email.value === '') {
            errores.push("The username must have at least 6 characters");
        }

        if (password.value.length < 8) {
            errores.push("The password must have at least 8 characters");
        }

        if (email.value == "") {
            errores.push("You must enter an email");
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

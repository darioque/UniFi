window.addEventListener('load', function() {
git 

const formulario = document.querySelector('form.login-form')
const email = document.querySelector('input.email')
const password = document.querySelector('input.password')
const button = document.querySelector('button')

    formulario.addEventListener('submit', function(e){
        

        let errores = []

        if(email.value == "" ){
            errores.push("You must enter an email")
        }

        if(password.value.length < 8 ){
            errores.push("The password must have at least 8 characters")
        }

        if(errores.length > 0){
            e.preventDefault()

            let ulErrores = document.querySelector("div.errores ul")

            ulErrores.classList.add('no-list')

            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    })

    });
window.addEventListener("load", (event) => {
    const metamaskButton = document.getElementById("metamaskButton");
    const metamaskLogo = document.querySelector('#metamaskLogo');
    const address = document.getElementById("address");
    const addressText = document.getElementById("addressText");
    const loginForm = document.getElementById("metamaskLoginForm");

    let clickCounter = 0;

    toggleButton();

    function toggleButton() {
        if (!window.ethereum) {
            metamaskButton.innerText = "Metamask is not installed";
            return false;
        }
        metamaskLogo? metamaskLogo.addEventListener("click", signIn): '';        
        metamaskButton.addEventListener("click", signIn);        

    }

    async function signIn() {
        // al clickear el boton por primera vez se aumenta el contador y se intenta conectar a la billetera
        clickCounter++;
        try {
            var accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
            clickCounter--
            return false;
        }

        // coloca la wallet address como valor del input del formulario
        address.value = accounts[0];
        // disminuye el margen tomando en cuenta el texto a agregar
        metamaskButton.style.marginTop = "24px";
        // muestra parte de la address encima del boton con formato "0x355...5645A4"
        addressText.innerText =
            accounts[0].substring(0, 5) + "..." + accounts[0].substring(38, 42);
        // cambia el texto del boton a "sign in"
        metamaskButton.innerText = "Sign In";
        // variables para la transacción
        const from = accounts[0];
        const msg = `UniFi sign-in with wallet address ${accounts[0]}`;

        // al clickear el boton por segunda vez, pide al usuario confirmar una transacción de firma
        if (clickCounter >= 2) {
            try {
                await ethereum.request({
                    method: "personal_sign",
                    params: [msg, from, "Example password"],
                });
                loginForm.submit();
            } catch (err) {
                alert(`Error: ${err.message}`);
                return false;
            }
        }
    }
});

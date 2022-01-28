window.addEventListener("DOMContentLoaded", (event) => {
    const metamaskButton = document.getElementById("metamaskButton");
    const address = document.getElementById("address");
    const addressText = document.getElementById("addressText");
    const loginForm = document.getElementById("metamaskLoginForm");

    toggleButton();

    function toggleButton() {
        if (!window.ethereum) {
            metamaskButton.innerText = "Metamask is not installed";
            return false;
        }
        metamaskButton.addEventListener("click", signIn);
    }

    async function signIn() {

        try {
            var accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
            return false;
        }
        address.value = accounts[0];
        metamaskButton.style.marginTop = '24px'
        addressText.innerText =
            accounts[0].substring(0, 5) + "..." + accounts[0].substring(38, 42);
        metamaskButton.innerText = "Sign In";
        const from = accounts[0];
        const msg = `UniFi login with wallet address ${accounts[0]}`;

        try {
            await ethereum.request({
                method: "personal_sign",
                params: [msg, from, "Example password"],
            });
        }
        catch (err) {
            alert(`Error: ${err.message}`);
            return false
        }
        loginForm.submit();
    }
});

const metamaskButton = document.getElementById("metamaskButton");
const address = document.getElementById("address");
const addressText = document.getElementById("addressText");
const loginButton = document.getElementById("loginButton");

function toggleButton() {
    if (!window.ethereum) {
        metamaskButton.innerText = "Metamask is not installed";
        return false;
    }
    metamaskButton.addEventListener("click", loginWithMetamask);
}

async function loginWithMetamask() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    address.value = accounts[0];
    addressText.innerText =
        accounts[0].substring(0, 5) + "..." + accounts[0].substring(38, 42);
    metamaskButton.style.display = "none";
    loginButton.style.display = "block";
}

window.addEventListener("DOMContentLoaded", (event) => {
    toggleButton();
});

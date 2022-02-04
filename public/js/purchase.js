window.onload = () => {
    const myBtn = document.querySelector("#myBtn");
    const amountInput = document.querySelector("#amount");
    const priceInput = document.querySelector("#price");
    const amountConfirmation = document.querySelector("#amountConfirmation");
    const priceConfirmation = document.querySelector("#priceConfirmation");
    const currencyTitle = document.querySelector("#currencyTitle");
    const confirmationCurrencyTitle = document.querySelector(
        "#confirmationCurrencyTitle"
    );
    const currencyLogo = document.querySelector("#currencyLogo");
    const currenconfirmationCurrencyLogocyLogo = document.querySelector(
        "#confirmationCurrencyLogo"
    );

    myBtn.addEventListener("click", function (e) {
        e.preventDefault();
        amountConfirmation.innerText = amountInput.value;
        priceConfirmation.innerText = priceInput.value;
        confirmationCurrencyTitle.innerText = currencyTitle.innerText;
        const src = currencyLogo.getAttribute("src");
        confirmationCurrencyLogo.setAttribute("src", src);
    });
};

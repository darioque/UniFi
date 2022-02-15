window.onload = () => {
    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    const priceTitle = document.getElementsByClassName("price-title")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

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
    
    const confirmationCurrencyLogo = document.querySelector(
        "#confirmationCurrencyLogo"
    );

    const price = priceInput.value

    amountInput.addEventListener('input', function () {
        priceInput.value = price * this.value;
    })

    myBtn.addEventListener("click", function (e) {

        e.preventDefault();

        amountConfirmation.innerText = amountInput.value;

        priceConfirmation.innerText = priceInput.value;

        confirmationCurrencyTitle.innerText = currencyTitle.innerText;

        const src = currencyLogo.getAttribute("src");

        confirmationCurrencyLogo.setAttribute("src", src);
    });
};

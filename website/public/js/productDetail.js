window.onload = () => {
    function createChart() {
        const labels = ["January", "February", "March", "April", "May", "June"];
    
        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Under starting price",
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    data: [0, 10, 5, 2, null, null, null],
                    fill: {
                        target: "start",
                        below: "rgb(255, 99, 132)",
                    },
                },
                {
                    label: "Above starting price",
                    borderColor: "rgb(80, 255, 132)",
                    backgroundColor: "rgba(80, 255, 132, 0.5)",
                    data: [null, null, null, 30, 50, 92, 45],
                    fill: {
                        target: "start",
                        below: "rgb(0,255,0) ",
                    },
                },
            ],
        };
    
        const config = {
            type: "line",
            data: data,
            options: {},
        };
    
        const myChart = new Chart(document.getElementById("myChart"), config);
    }

    function purchase() {
        // Get the modal
        const modal = document.getElementById("myModal");

        // Get the button that opens the modal
        const btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];

        const form = document.getElementById("modalForm");

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
            amountConfirmation.value = amountInput.value;

            priceConfirmation.value = priceInput.value;

            confirmationCurrencyTitle.innerText = currencyTitle.innerText;

            const src = currencyLogo.getAttribute("src");

            confirmationCurrencyLogo.setAttribute("src", src);
        };

        const myBtn = document.querySelector(".confirm-button");

        const amountInput = document.querySelector("#amount");

        const priceInput = document.querySelector("#price");

        const amountConfirmation = document.querySelector(
            "#amountConfirmation"
        );

        const priceConfirmation = document.querySelector("#priceConfirmation");

        const currencyTitle = document.querySelector("#currencyTitle");

        const confirmationCurrencyTitle = document.querySelector(
            "#confirmationCurrencyTitle"
        );

        const currencyLogo = document.querySelector("#currencyLogo");

        const confirmationCurrencyLogo = document.querySelector(
            "#confirmationCurrencyLogo"
        );

        const price = priceInput.value;

        amountInput.addEventListener("input", function () {
            priceInput.value = price * this.value;
        });

    }

    createChart()
    purchase()

};

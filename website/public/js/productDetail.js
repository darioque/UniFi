window.onload = () => {
    const amountInput = document.querySelector("#amount");

    const priceInput = document.querySelector("#price");

    const amountConfirmation = document.querySelector("#amountConfirmation");

    const priceConfirmation = document.querySelector("#priceConfirmation");

    const currencyTitle = document.querySelector("#currencyTitle");

    const confirmationCurrencyTitle = document.querySelector(
        "#confirmationCurrencyTitle"
    );

    const output_asset_id = document.querySelector("#output_asset_id");

    const currencyLogo = document.querySelector("#currencyLogo");

    const confirmationCurrencyLogo = document.querySelector(
        "#confirmationCurrencyLogo"
    );

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
    function changeAsset() {
        const modal = document.getElementById("listModal");

        const btn = document.querySelector("#listBtn");
        const searchInput = document.querySelector("#search");

        btn.onclick = async (e) => {
            modal.style.display = "block";
            document.onkeydown = (e) => {
                if (e.key == "Escape") {
                    modal.style.display = "none";
                }
            };
            const marketType = location.href
                .split("/markets/")[1]
                .split("/")[0];
            const response = await fetch(
                `http://localhost:3001/api/markets/${marketType}`
            ).then((assets) => assets.json());
            const assets = response.data;

            const assetList = document.querySelector("#assetList");
            assetList.style.overflow = "scroll";
            assets.forEach((asset) => {
                const link = document.createElement("a");
                link.classList.add("no-link");
                link.onclick = (e) => {
                    e.preventDefault();
                    modal.style.display = "none";
                    currencyTitle.innerHTML = p.innerText;
                    currencyLogo.setAttribute("src", img.getAttribute("src"));
                    priceInput.value = asset.price;
                    output_asset_id.value = asset.id
                };
                const list = document.createElement("li");
                list.classList.add("no-list");
                const listDiv = document.createElement("div");
                listDiv.classList.add("list-items");

                const name = document.createElement("div");
                name.classList.add("name");

                const img = document.createElement("img");
                img.classList.add("currency-logo");
                img.setAttribute("src", `${asset.logo}`);
                img.setAttribute("alt", `${asset.ticker}'s Logo`);

                const p = document.createElement("p");
                p.innerText = `${asset.ticker}`;
                p.setAttribute("id", "ticker");

                const span = document.createElement("p");
                span.innerHTML = `${asset.name}`;
                span.setAttribute("id", "fullName");
                span.style.color = "rgb(128, 138, 157)";
                span.style.fontSize = "12px";

                const nameDiv = document.createElement("div");
                nameDiv.classList.add("nameDiv");
                nameDiv.appendChild(p);
                nameDiv.appendChild(span);

                name.appendChild(img);
                name.appendChild(nameDiv);
                listDiv.appendChild(name);
                list.appendChild(listDiv);
                link.appendChild(list);
                assetList.appendChild(link);
            });
        };
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
        if (btn) {
            btn.onclick = function () {
                modal.style.display = "block";
                document.onkeydown = (e) => {
                    if (e.key == "Escape") {
                        modal.style.display = "none";
                    }
                };
                amountConfirmation.value = amountInput.value;

                priceConfirmation.value = priceInput.value;

                confirmationCurrencyTitle.innerText = currencyTitle.innerText;

                const src = currencyLogo.getAttribute("src");

                confirmationCurrencyLogo.setAttribute("src", src);

            };
        }

        span.onclick = function () {
            modal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };

        let price = priceInput.value;

        amountInput.addEventListener("focus", function () {
            price = priceInput.value;
        });

        amountInput.addEventListener("input", function () {
            priceInput.value = price * this.value;
        });
    }

    createChart();
    changeAsset();
    purchase();
};

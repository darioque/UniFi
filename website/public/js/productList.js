window.onload = async () => {
    const searchInput = document.querySelector("#search");

    const response = await fetch(
        "http://localhost:3001/api/markets/cryptocurrencies"
    ).then((assets) => assets.json());
    const assets = response.data;
    listAssets(assets);
    searchInput.addEventListener("input", function (e) {
        const assetListDiv = document.querySelector("#assetList");

        const filteredAssets = assets.filter(
            (asset) =>
                asset.name.toLowerCase().includes(this.value.toLowerCase()) ||
                asset.ticker.toLowerCase().includes(this.value.toLowerCase())
        );

        assetListDiv.innerHTML = "";

        listAssets(filteredAssets);
    });
};

function listAssets(assets) {
    assets.forEach((asset) => {
        const assetListDiv = document.querySelector("#assetList");
        const link = document.createElement("a");
        link.classList.add("no-link");
        link.setAttribute("href", `/markets/${asset.type.name}/${asset.id}`);

        const list = document.createElement("li");
        list.classList.add("no-list");

        const listDiv = document.createElement("div");
        listDiv.classList.add("list-items");

        const name = document.createElement("div");
        name.classList.add("name");

        const price = document.createElement("p");
        price.classList.add("price");
        if (asset.price < 0.00000001) {
            price.innerText = `${asset.price.toFixed(13)}`;
        } else {
            price.innerText = `${asset.price.toFixed(5)}`;
        }

        const mcap = document.createElement("p");
        mcap.classList.add("mcap");
        mcap.innerText = `N/A`;
        if (asset.mcap == null && asset.supply && asset.price) {
            mcap.innerText = `${asset.price * asset.supply}`;
        } else {
            mcap.innerText = `${asset.mcap}`;
        }

        if (!asset.change) {
            asset.change = "N/A";
        }
        const change = document.createElement("p");
        change.classList.add("change", "green");
        change.innerText = `N/A`;

        if (asset.price_change_24) {
            if (asset.price_change_24 > 0) {
                change.innerText = `${asset.price_change_24}`;
            } else {
                change.classList.remove("green");
                change.classList.add("red");
                change.innerText = `-${asset.price_change_24}`;
            }
        }

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
        listDiv.appendChild(price);
        listDiv.appendChild(mcap);
        listDiv.appendChild(change);
        list.appendChild(listDiv);
        link.appendChild(list);
        assetListDiv.appendChild(link);
    });
}

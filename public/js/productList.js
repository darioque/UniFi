window.onload = async () => {
    const searchInput = document.querySelector("#search");

    const response = await fetch(
        "http://localhost:3000/api/markets/cryptocurrencies"
    ).then((assets) => assets.json());
    const assets = response.data
    listAssets(assets)
    searchInput.addEventListener("input", function (e) {

        const assetListDiv = document.querySelector("#assetList");

        const filteredAssets = assets.filter((asset) => asset.name.toLowerCase().includes(this.value.toLowerCase()))
        
        assetListDiv.innerHTML = ''

        listAssets(filteredAssets)
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
        price.innerText = `${asset.price}`;

        const mcap = document.createElement("p");
        mcap.classList.add("mcap");
        mcap.innerText = `${asset.mcap}`;

        if (!asset.change) {
            asset.change = 'N/A'
        }
        const change = document.createElement("p");
        change.innerText = `${asset.change}`;
        if (asset.change > 0) {
            change.classList.add("change", "red");
        } else {
            change.classList.add("change", "green");
        }

        const img = document.createElement("img");
        img.classList.add("currency-logo");
        img.setAttribute("src", `${asset.logo}`);
        img.setAttribute("alt", `${asset.ticker}'s Logo`);

        const p = document.createElement("p");
        p.innerText = `${asset.name}`;

        name.appendChild(img);
        name.appendChild(p);
        listDiv.appendChild(name);
        listDiv.appendChild(price);
        listDiv.appendChild(mcap);
        listDiv.appendChild(change);
        list.appendChild(listDiv);
        link.appendChild(list);
        assetListDiv.appendChild(link);
    });
}

window.onload = async () => {
    const searchInput = document.querySelector("#search");
    const nameFilter = document.querySelector("#nameFilter");
    const mcapFilter = document.querySelector("#mcapFilter");
    const changeFilter = document.querySelector("#changeFilter");
    const priceFilter = document.querySelector("#priceFilter");
    const marketType = location.href.split("/markets/")[1];

    const response = await fetch(
        `http://localhost:3001/api/${marketType}/markets/`
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

    nameFilter.setAttribute("order", "ASC");
    nameFilter.setAttribute("sort", "ticker");
    priceFilter.setAttribute("order", "ASC");
    priceFilter.setAttribute("sort", "price");
    changeFilter.setAttribute("order", "ASC");
    changeFilter.setAttribute("sort", "price_change_24");
    mcapFilter.setAttribute("order", "ASC");
    mcapFilter.setAttribute("sort", "mcap");

    nameFilter.addEventListener("click", sortBy);
    priceFilter.addEventListener("click", sortBy);
    changeFilter.addEventListener("click", sortBy);
    mcapFilter.addEventListener("click", sortBy);

    async function sortBy() {
        const assetListDiv = document.querySelector("#assetList");
        const sort = this.getAttribute("sort");
        const order = this.getAttribute("order") == "ASC" ? "DESC" : "ASC";
        this.setAttribute("order", order);
        const response = await fetch(
            `http://localhost:3001/api/${marketType}/markets/?sortBy=${sort}&orderBy=${order}`
        ).then((assets) => assets.json());
        const assets = response.data;
        assetListDiv.innerHTML = "";
        listAssets(assets);
    }
};

function listAssets(assets) {
    assets.forEach((asset) => {
        const assetListDiv = document.querySelector("#assetList");
        const link = document.createElement("a");
        link.classList.add("no-link");
        link.classList.add("assetLink");
        link.setAttribute("href", `/markets/${asset.type.name}/${asset.id}`);

        const list = document.createElement("li");
        list.classList.add("no-list");
        list.classList.add("asset");

        const listDiv = document.createElement("div");
        listDiv.classList.add("list-items");

        const name = document.createElement("div");
        name.classList.add("name");

        const price = document.createElement("p");
        price.classList.add("price");
        price.innerText = "$" + new Intl.NumberFormat().format(asset.price);

        const mcap = document.createElement("p");
        mcap.classList.add("mcap");
        mcap.innerText =
            "$" + new Intl.NumberFormat().format(asset.mcap) ??
            new Intl.NumberFormat().format(asset.price * asset.supply) ??
            `N/A`;

        if (!asset.change) {
            asset.change = "N/A";
        }
        const change = document.createElement("p");
        change.classList.add("change", "green");
        change.innerText = `N/A`;

        if (asset.price_change_24) {
            if (asset.price_change_24 > 0) {
                change.innerText = `${asset.price_change_24}%`;
            } else {
                change.classList.remove("green");
                change.classList.add("red");
                change.innerText = `${asset.price_change_24}%`;
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
    if (assets.length == 0) {
        const assetListDiv = document.querySelector("#assetList");
        const p = document.createElement("p");
        p.innerHTML = "No assets found";
        assetListDiv.appendChild(p);
    }
    return;
}

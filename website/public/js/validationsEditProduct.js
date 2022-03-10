window.addEventListener("load", function () {
    const formulario = document.querySelector("form.edit-product");
    const name = document.getElementsByName("name");
    const type_id = document.getElementsByName("type_id");
    const ticker = document.getElementsByName("ticker");
    const price = document.getElementsByName("price");
    const price_change_24 = document.getElementsByName("price_change_24");
    const supply = document.getElementsByName("supply");
    const logo = document.getElementsByName("logo");
    const mcap = document.getElementsByName("mcap");
       
    formulario.addEventListener("submit", function(e) {
        let errores = [];

        if (name.value == "") {
            errores.push("Complete Name");
        }

        if (type_id == "") {
            errores.push("Type cannot be empty");
        }

        if (ticker == ""){
            errores.push("Complete Ticker");
        }

        if (price == ""){
            errores.push("Complete Price");
        }

        if (price_change_24 == "") {
            errores.push("Complete Price-Change-24");
        }

        if (mcap == "") {
            errores.push("Complete MarketCap");
        }

        if (errores.length > 0) {
            e.preventDefault();

        }

    });

});
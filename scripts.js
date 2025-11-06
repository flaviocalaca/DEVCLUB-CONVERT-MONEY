
const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".select-currency");

const convertValues = async () => {
    const inputCurrencyValue = document.querySelector("#input-currency").value;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    try {
        const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL").then(response => response.json());

        const dolarToday = data.USDBRL.bid;
        const euroToday = data.EURBRL.bid;
        const libraToday = data.GBPBRL.bid;
        const bitcoinToday = data.BTCBRL.bid;

        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue);

        switch (currencySelect.value) {
            case "Dolar":
                currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(inputCurrencyValue / dolarToday);
                break;
            case "Euro":
                currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                }).format(inputCurrencyValue / euroToday);
                break;
            case "Libra":
                currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                }).format(inputCurrencyValue / libraToday);
                break;
            case "Bitcoin":
                const bitcoinValue = parseFloat(bitcoinToday.replace('.', '').replace(',', '.'));
                currencyValueConverted.innerHTML = "₿ " + (inputCurrencyValue / bitcoinValue).toFixed(8);
                break;
        }
    } catch (error) {
        console.error("Erro ao converter valores:", error);
        alert("Ocorreu um erro ao buscar as taxas de câmbio. Por favor, tente novamente.");
    }
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    switch (currencySelect.value) {
        case "Dolar":
            currencyName.innerHTML = "Dólar Americano";
            currencyImage.src = "./assets/dolar.png";
            break;
        case "Euro":
            currencyName.innerHTML = "Euro";
            currencyImage.src = "./assets/Euro.png";
            break;
        case "Libra":
            currencyName.innerHTML = "Libra";
            currencyImage.src = "./assets/libra.png";
            break;
        case "Bitcoin":
            currencyName.innerHTML = "Bitcoin";
            currencyImage.src = "./assets/bitcoin 1.png";
            break;
    }

    convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

const convertButton = document.querySelector(".convert-button");
const inputCurrencySelect = document.querySelector(".select-currency"); // Renomeado para evitar conflito
const currencyValueToConvertElement = document.querySelector(".currency-value-to-convert");
const currencyValueConvertedElement = document.querySelector(".currency-value");
const inputCurrencyValueElement = document.querySelector("#input-currency"); // Elemento do input, não o valor diretamente

const convertValues = async () => {
    const inputAmount = parseFloat(inputCurrencyValueElement.value); // Converte para número

    if (isNaN(inputAmount) || inputAmount <= 0) {
        alert("Por favor, insira um valor numérico válido para a conversão.");
        currencyValueConvertedElement.innerHTML = ""; // Limpa o resultado
        currencyValueToConvertElement.innerHTML = ""; // Limpa o valor a converter
        return;
    }

    try {
        const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL");
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        const rates = {
            "Dolar": data.USDBRL?.bid, // Usando 'bid' para maior precisão, e encadeamento opcional para segurança
            "Euro": data.EURBRL?.bid,
            "Libra": data.GBPBRL?.bid,
            "Bitcoin": data.BTCBRL?.bid
        };

        const selectedCurrency = inputCurrencySelect.value;
        const exchangeRate = rates[selectedCurrency];

        if (!exchangeRate) {
            alert(`Taxa de câmbio para ${selectedCurrency} não encontrada.`);
            return;
        }

        const convertedValue = inputAmount / exchangeRate;

        // Formatação do valor convertido
        let locale = "pt-BR"; // Locale padrão
        let currencyCode = "BRL"; // Código de moeda padrão

        switch (selectedCurrency) {
            case "Dolar":
                locale = "en-US";
                currencyCode = "USD";
                break;
            case "Euro":
                locale = "de-DE";
                currencyCode = "EUR";
                break;
            case "Libra":
                locale = "en-GB";
                currencyCode = "GBP";
                break;
            case "Bitcoin":
                locale = "en-US"; // Ou um locale mais específico para Bitcoin, se houver
                currencyCode = "BTC";
                break;
        }

        currencyValueConvertedElement.innerHTML = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currencyCode
        }).format(convertedValue);

        // Formatação do valor a ser convertido (sempre em BRL)
        currencyValueToConvertElement.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputAmount);

    } catch (error) {
        console.error("Erro ao converter valores:", error);
        alert("Ocorreu um erro ao buscar as taxas de câmbio. Por favor, tente novamente.");
    }
};

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");
    const selectedCurrency = inputCurrencySelect.value;

    switch (selectedCurrency) {
        case "Dolar":
            currencyName.innerHTML = "Dólar";
            currencyImage.src = "./Assets/dollar.png";
            break;
        case "Euro":
            currencyName.innerHTML = "Euro";
            currencyImage.src = "./Assets/euro.png";
            break;
        case "Libra":
            currencyName.innerHTML = "Libra";
            currencyImage.src = "./Assets/libra.png";
            break;
        case "Bitcoin": // Adiciona o case para Bitcoin
            currencyName.innerHTML = "Bitcoin";
            currencyImage.src = "./Assets/bitcoin.png"; // Certifique-se de ter esta imagem
            break;
        default:
            currencyName.innerHTML = "Real Brasileiro"; // Valor padrão caso nenhuma opção seja selecionada
            currencyImage.src = "./Assets/real.png"; // Imagem padrão
            break;
    }

    convertValues(); // Chama a função de conversão após a mudança da moeda
}

// Event Listeners
inputCurrencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

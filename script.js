const EXCHANGE_RATES = {
    real: 1,
    dolar: 5.38,
    euro: 6.38
};

// Informações de cada moeda
const CURRENCY_INFO = {
    real: {
        name: 'Real',
        symbol: 'R$',
        flag: './assets/logo bandeira do brasil.jpg',
        locale: 'pt-BR',
        code: 'BRL'
    },
    dolar: {
        name: 'Dólar Americano',
        symbol: 'US$',
        flag: './assets/logo bandeira Estados Unidos.jpg',
        locale: 'en-US',
        code: 'USD'
    },
    euro: {
        name: 'Euro',
        symbol: '€',
        flag: './assets/logo bandeira União Européia.png',
        locale: 'de-DE',
        code: 'EUR'
    }
};

// Elementos do DOM
const convertButton = document.querySelector(".convert-button");
const inputCurrency = document.querySelector(".imput-currency");
const currencySelectFrom = document.querySelector(".currency-select-from");
const currencySelectTo = document.querySelector(".currency-select-to");

const currencyImgFrom = document.getElementById("currency-img-from");
const currencyNameFrom = document.getElementById("currency-name-from");
const currencyValueFrom = document.getElementById("currency-value-from");

const currencyImgTo = document.getElementById("currency-img-to");
const currencyNameTo = document.getElementById("currency-name-to");
const currencyValueTo = document.getElementById("currency-value-to");

// Função para atualizar a interface com base nas moedas selecionadas
function updateCurrencyDisplay() {
    const fromCurrency = currencySelectFrom.value;
    const toCurrency = currencySelectTo.value;
    
    // Atualiza moeda de origem
    currencyImgFrom.src = CURRENCY_INFO[fromCurrency].flag;
    currencyNameFrom.textContent = CURRENCY_INFO[fromCurrency].name;
    
    // Atualiza moeda de destino
    currencyImgTo.src = CURRENCY_INFO[toCurrency].flag;
    currencyNameTo.textContent = CURRENCY_INFO[toCurrency].name;
    
    // Reseta os valores exibidos
    currencyValueFrom.textContent = formatCurrency(0, fromCurrency);
    currencyValueTo.textContent = formatCurrency(0, toCurrency);
}

// Função para formatar valor como moeda
function formatCurrency(value, currencyType) {
    const info = CURRENCY_INFO[currencyType];
    return value.toLocaleString(info.locale, {
        style: 'currency',
        currency: info.code
    });
}

// Função para converter entre duas moedas
function convertBetweenCurrencies(value, fromCurrency, toCurrency) {
    // Primeiro converte para Real (moeda base)
    const valueInReal = value * EXCHANGE_RATES[fromCurrency];
    
    // Depois converte do Real para a moeda de destino
    const convertedValue = valueInReal / EXCHANGE_RATES[toCurrency];
    
    return convertedValue;
}

// Função principal de conversão
function convertValues() {
    const inputValue = parseFloat(inputCurrency.value);
    
    // Valida a entrada
    if (isNaN(inputValue) || inputValue <= 0) {
        alert("Por favor, insira um valor válido!");
        return;
    }
    
    const fromCurrency = currencySelectFrom.value;
    const toCurrency = currencySelectTo.value;
    
    // Verifica se está tentando converter para a mesma moeda
    if (fromCurrency === toCurrency) {
        alert("Por favor, selecione moedas diferentes!");
        return;
    }
    
    // Realiza a conversão
    const convertedValue = convertBetweenCurrencies(inputValue, fromCurrency, toCurrency);
    
    // Formata e exibe os valores
    currencyValueFrom.textContent = formatCurrency(inputValue, fromCurrency);
    currencyValueTo.textContent = formatCurrency(convertedValue, toCurrency);
    
    // Log para depuração
    console.log(`${formatCurrency(inputValue, fromCurrency)} → ${formatCurrency(convertedValue, toCurrency)}`);
}

// Event Listeners
convertButton.addEventListener("click", convertValues);

// Atualiza a interface quando as moedas são alteradas
currencySelectFrom.addEventListener("change", updateCurrencyDisplay);
currencySelectTo.addEventListener("change", updateCurrencyDisplay);

// Permite conversão ao pressionar Enter no input
inputCurrency.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        convertValues();
    }
});

// Inicializa a interface
updateCurrencyDisplay();

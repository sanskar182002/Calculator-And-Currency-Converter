const toggle_btn = document.querySelector(".toggle")
const body = document.querySelectorAll("body")
const buttons = document.querySelectorAll(".num")
const clear_btn = document.querySelector(".clear-btn")
const input = document.querySelector("input")
const operations = document.querySelectorAll(".plus-btn, .minus-btn, .divide-btn, .multiply-btn")
const equal = document.querySelector(".equal-btn");
const reset_btn = document.querySelector(".Reset");
Dark = false;
var operator
var first, second

buttons.forEach(button => {
    button.addEventListener("click", () => {
        var text =  button.value
        if(text==="Input")    
        {
            input.value = "Input"
            input.style.color = "rgb(134, 131, 131)"
        }
        else
        {
            if(input.value == '0' || input.value == 'Input')
                input.value = text;
            else    input.value = input.value + text;
            if(Dark == false)
                input.style.color = "black";
            else
                input.style.color = "whitesmoke";
        }
    })
})

clear_btn.addEventListener("click", () =>{
    input.value = "0";
});

reset_btn.addEventListener("click", () => {
    input.value = "Input";
    input.stylle.color = "whitesmoke";
});

toggle_btn.addEventListener("click", () => {
    body.forEach(body => {
        body.classList.toggle("dark");
    });
    if(Dark == false)
    {
        Dark = true
        toggle_btn.innerText = "Dark Mode"
        input.style.color = "whitesmoke";
    }
    else
    {
        Dark = false
        toggle_btn.innerText = "Light Mode"
        input.style.color = "black";
    }
});

operations.forEach(operation => {
    operation.addEventListener("click", () => {
        first = input.value;
        var operand = operation.value
        if(operand == "+")
        {
            input.value = "0"
            operator = '+'
        }
        else if(operand == "-")
        {
            input.value = "0"
            operator = '-'
        }
        else if(operand == "x")
        {
            input.value = "0"
            operator = 'x'
        }
        else if(operand == "/")
        {
            input.value = "0"
            operator = '/'
        }
    });
})

equal.addEventListener("click", () =>{
    second = input.value;
    let ans;
    if(operator == '+')
    {
        ans = first + second;
        input.value = `${ans}`;
        first=0, second=0;
    }
    if(operator == '-')
    {
        ans = first-second;
        input.value = `${ans}`;
        first=0, second=0;
    }
    if(operator == 'x')
    {
        ans = first*second;
        input.value = `${ans}`;
        first=0, second=0;
    }
    if(operator == '/')
    {
        ans = first/second;
        input.value = `${ans}`;
        first=0, second=0;
    }
    error(ans);
});

function error(answer) 
{
    if(answer == "NaN")
    {
        alert("Input error")
        input.value = '0'
    }
};

const dropList = document.querySelectorAll(".drop-list select"),
getButton = document.querySelector("form button"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select");

for(let i=0;i<dropList.length;i++)
{
    for(currency_code in country_code)
    {
        let selected;
        if(i==0)
        {
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if(i==1)
        {
            selected = currency_code == "INR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e=> {
        loadFlag(e.target);
    });
}

function loadFlag(element)
{
    for(code in country_code)
    {
        if(code == element.value)
        {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://countryflagsapi.com/png/${country_code[code]}`;
        }
    }
}

window.addEventListener("load", e => {
    getExchangeRate();
});
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", ()=> {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0")
    {
        amount.value = "1";
        amountVal = 1;
    }
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    exchangeRateTxt.innerText = `Getting Exchange Rates ....`;
    let url = `https://v6.exchangerate-api.com/v6/bdcaffd7362a85251d8f6242/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went Wrong";
    });
}
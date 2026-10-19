const Select = (element) => document.querySelector(element);
const input = Select("input");
const btn = Select(".go");
const Output = Select(".result");
const resultInner = Select(".result-inner");

console.log(input);
console.log(btn);
console.log(Output);
console.log(resultInner);

/* dummy data */
const Conditions = ["Sunny", "Moderate rain at times", "Patchy rain nearby", "Smoky haze",];
const ConditionImg = [
    "./animated/day.svg",
    "./animated/rainy-2.svg",
    "./animated/rainy-4.svg",
    "./animated/snowy-4.svg"
]

const Default = () => resultInner.innerHTML = "";
const showLoader=()=> resultInner.innerHTML = `<div class="loader"></div>`
async function WeatherData(Name) {
    Output.classList.add("block");
    showLoader();
    try {
        const Weather = await fetch(`https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=$${Name}&aqi=no`);
        if (!Weather.ok) {
            return showError();
        }
        const data = await Weather.json();
        showData(data);
        Output.classList.add("block");
    } catch (err) {
        showError();
    }
};

function getConditionImg(text) {
    const Index = Conditions.indexOf(text);
    return Index === -1 ? "./animated/cloudy.svg" : ConditionImg[Index];
};

function showData(data) {
    Default();
    resultInner.innerHTML = `
       <h1 class="region">${data.location.name},${data.location.region === "" ? "unknown" : data.location.region}, ${data.location.country}</h1>
                <h2 class="Celcius">Temperature : ${data.current.temp_c}°C</h2>
                <h3 class = "feels-like">Feels like: ${data.current.feelslike_c}°C</h3>
                <h4 class="humidity">Humidity: ${data.current.humidity}</h4>
                <h4 class="condition">Condition: ${data.current.condition.text}</h4>
                <div class="imogy">
                    <img height="50px" weight="50px" src="${getConditionImg(data.current.condition.text)}" alt="${data.current.condition.text}">
                </div>
   
   `
};

function showError() {
    Default();
    resultInner.innerHTML = `
     <h2 class="Error">No data found or something went wrong with data !!!</h2>
     `
    Output.classList.add("block");
}
function inputBlank() {
    input.value = "";
}
function showResult() {
    if (input.value === "") {
        return alert("Please enter a location  first");
    }
    if (!/^[A-Za-z, ]+$/.test(input.value)) {
        inputBlank()
        return alert("Search key should be alphabetic letters")
    }
    console.log(input.value)
    WeatherData(input.value);
    inputBlank()
}
btn.addEventListener("click", () => {
    showResult();

});
document.addEventListener("keydown", (e) => {
    // console.log(e);
    if (e.key === "Enter") {
        showResult();
    }
})


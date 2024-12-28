const BASE_URL =
  "https://v6.exchangerate-api.com/v6/e3b68cd5755f48a4e17dd043/pair";
let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromcur = document.querySelector(".from select");
let tocur = document.querySelector(".to select");
let msg = document.querySelector(".msg");
for (let select of dropdown) {
  for (code in countryList) {
    let newop = document.createElement("option");
    newop.innerText = code;
    newop.value = code;
    if (select.name == "from" && code == "USD") {
      newop.selected = "selected";
    } else if (select.name == "to" && code == "PKR") {
      newop.selected = "selected";
    }

    select.append(newop);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}
const updateflag = (element) => {
  let code = element.value;
  let countrycode = countryList[code];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png `;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};
window.addEventListener("load", () => {
  updateExchangeRate();
});
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;

  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  console.log(fromcur.value, tocur.value);
  const URL = `${BASE_URL}/${fromcur.value}/${tocur.value}`;
  let reponse = await fetch(URL);
  let data = await reponse.json();
  let rate = data.conversion_rate;
  let finalamount = amtval * rate;
  msg.innerText = `${amtval}${fromcur.value}=${finalamount}${tocur.value}`;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// ? Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// ? Hide Loading
function complete() {
    if (! loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// ? Get Quote From API
async function getQuote() {
    loading();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // ? If Author Is Black Add "Unknown".
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // ? Reduce Font Size For Long Quotes.
        if (data.quoteText.lenght > 120) {
            quoteText.classList.add("long-Quote");
        } else {
            quoteText.classList.remove("Long-Quote");
        }
        quoteText.innerText = data.quoteText;
        // ? stop loader and show the quote.
        complete();
    }   catch (error) {
        getQuote();

    }
}
// ? Twiiter Quote Function.
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// ? Event Listeners.
newQuoteBtn.addEventListener("Click", getQuote);
twitterBtn.addEventListener("Click", tweetQuote);

// ? On Load
getQuote();
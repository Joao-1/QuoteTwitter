const Twitter = require("twitter-lite");
const fs = require("fs");
const fetch = require("node-fetch");

const client = new Twitter({
  subdomain: "upload",
  consumer_key: "TtraCddTGYVFCF0g6FZ1lztvM",
  consumer_secret: "GYGHE4PWS7Twid7oasL0zrbNymqi5PzZTPHKfbKJiTJCYqrb6p",
  access_token_key: "1392965491195588610-sxfr0CK7AT6GxU0boiBEKYVWmTi7gc",
  access_token_secret: "47Uzkf5ejDRCEFovKb9CIGmW91wH9YFEcl06WI1Xl0gLT",
});

const clientAPI = new Twitter({
  subdomain: "api",
  consumer_key: "TtraCddTGYVFCF0g6FZ1lztvM",
  consumer_secret: "GYGHE4PWS7Twid7oasL0zrbNymqi5PzZTPHKfbKJiTJCYqrb6p",
  access_token_key: "1392965491195588610-sxfr0CK7AT6GxU0boiBEKYVWmTi7gc",
  access_token_secret: "47Uzkf5ejDRCEFovKb9CIGmW91wH9YFEcl06WI1Xl0gLT",
});

newPost();
async function newPost() {
  try {
    let quote = await newQuote();
    await clientAPI.post("statuses/update", {
      status: quote,
    });
  } catch (error) {
    console.log(error);
  }
}

async function newQuote() {
  let fetchQuote;
  await fetch("https://animechan.vercel.app/api/random").then(async (res) => {
    fetchQuote = await res.json();
  });
  const quote = `"${fetchQuote.quote}" - ${fetchQuote.character}, ${fetchQuote.anime}`;
  return quote;
}

setInterval(() => {
  newPost();
  console.log("Nova frase");
}, 1000 * 60 * 60);

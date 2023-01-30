setTimeout(() => console.log("Tick"), 1000)
console.log("Hello World")

function createQuote(quote, callback){
	let myQuote = "Like I always say, " + quote
	callback(myQuote)
}

createQuote("eat your vegetables!", console.log)

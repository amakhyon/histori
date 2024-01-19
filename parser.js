const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync("./uploads/7.pdf");

pdf(dataBuffer).then(function (data) {
	// number of pages

	// console.log(data.numpages);
	// // number of rendered pages
	// console.log(data.numrender);
	// // PDF info
	// console.log(data.info);
	// // PDF metadata
	// console.log(data.metadata);
	// // PDF.js version
	// // check https://mozilla.github.io/pdf.js/getting_started/
	// console.log(data.version);
	// // PDF text
	// console.log(data.text);


    var AllResume = data.text;
    var words = AllResume.split("\n");
    words = words.filter(v=> v!= '');


   
     //=============================================name===================================
    var name = words[0]
    console.log(name);
    //=========================================================email=================================
    // Regular expression to match email addresses
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

// Function to extract emails from an array of strings
function extractEmailsFromArray(array) {
  const extractedEmails = [];

  array.forEach((str) => {
    const matches = str.match(emailRegex);
    if (matches) {
      extractedEmails.push(matches[0]);
    }
  });

  return extractedEmails;
}

    // Get the extracted emails
    const extractedEmails = extractEmailsFromArray(words);

    // Output the result
    console.log("Extracted Emails:", extractedEmails);
   

    
});
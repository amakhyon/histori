const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync("./uploads/1.pdf");

//accepted formats are +971 or 00971 or (00971) or any other country code, otherwise it will be rejected!

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
    console.log("Extracted name: ",name);
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

 
   
//=====================================phone=============================

  function extractPhoneNumbers(array) { 
    // Define a regular expression for matching phone numbers
    const phoneRegex = /(\+([\d\s\-]*))|((\(\d*\))([\d\s\-]*))|(00([\d\s\-]*))/;
    const extractedPhoneNumbers = [];

    array.forEach((str) => {
      const matches = str.match(phoneRegex);
      if (matches && matches[0].length > 5) {
        extractedPhoneNumbers.push(matches[0].trim());
      }
    });
    return extractedPhoneNumbers;
  }

  // Example usage:
  const extractedPhoneNumbers = extractPhoneNumbers(words);

  console.log("Extracted phonenumber: ",extractedPhoneNumbers);

  // Get the extracted emails
  const extractedEmails = extractEmailsFromArray(words);

  // Output the result
  console.log("Extracted Emails: ", extractedEmails);
});


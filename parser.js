const fs = require("fs");
const pdf = require("pdf-parse");
const nlp = require('compromise');


var CVIndex = 0;
for (var i=1; i < 15; i++){



let dataBuffer = fs.readFileSync("./uploads/"+ i + ".pdf");

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
     function extractNamesFromArray(array){
      var name = array[0];
      return name;
     }
   
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
      if (matches && matches[0].length > 7) {
        extractedPhoneNumbers.push(matches[0].trim());
      }
    });
    return extractedPhoneNumbers;
  }

  function getWordsFromCV(array){
    const wordRegex = /\w+/;
    const extractedWords = [];

    array.forEach((str) => {
      const matches = str.match(wordRegex);
      if (matches) {
        extractedWords.push(matches[0].trim());
      }
    });
    return extractedWords;
  }
  const extractedName = extractNamesFromArray(words);
  const extractedPhoneNumbers = extractPhoneNumbers(words);
  const extractedEmails = extractEmailsFromArray(words);

  const doc = nlp(AllResume);
  const names = doc.people().out('array');
  const phones = doc.phoneNumbers().out('array');
  const emails = doc.emails().out('array');
  const places = doc.places().out('array');
  const links = doc.urls().out('array');
  const organizations = doc.organizations().out('array');




  console.log("               ----------- parsing CV " + CVIndex++ + "-----------");

  console.log("Extracted Name: ", extractedName);
  console.log("Extracted phonenumber: ",extractedPhoneNumbers);
  console.log("Extracted Emails: ", extractedEmails);



  console.log("Found names:", names);
  console.log("Found phones:", phones);
  console.log("Found emails:", emails);
  console.log("Found places:", places);
  console.log("Found links:", links);
  console.log("Found organizations:", organizations);

  console.log("============================================================")


});


}//loop to loop all documents



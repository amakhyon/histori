const fs = require("fs");
const pdf = require("pdf-parse");
const nlp = require('compromise');


var CVIndex = 0;
for (var i=1; i < 55; i++){



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
  const phones = doc.phoneNumbers().out('array');
  const emails = doc.emails().out('array');
  const places = doc.places().out('array');
  const country = doc.match('#place #country').json();
  const links = doc.urls().out('array');
  const organizations = doc.organizations().out('array');
  const nouns = doc.nouns().out('array');
  

  //play with compromise
  let jobs = doc.match('#Actor #Singular').json();
  let companies = doc.match('#Organization #Company').json();
  //useful links 
  // https://www.npmjs.com/package/compromise
  //https://observablehq.com/@spencermountain/nouns


function findJob(){
  let jobs = doc.match('#Actor #Singular').json();
  try{
    return jobs[0].text;
  } catch(err) {

  }
}

function findCountry(){
  const country = doc.match('#place #country').json();
  try{
    return country[0].text;
  } catch(err) {

  }
}
function findName(){
  const names = doc.people().out('array');
  try{
    if (names[0]){
      return names[0];
    } else { 
      return extractNamesFromArray(words);
    }
  } catch (err) {
  }
  
}

function findPhone(){
  const phones = doc.phoneNumbers().out('array');
  try{
    if (phones[0]){
      return phones[0];
    } else {
      return extractPhoneNumbers(words)[0];
    }
  } catch (err) {

    }
  
  
}
function findEmail(){
  const emails = doc.emails().out('array');

  try{
    if (emails[0]){
      return emails[0];
    } else {
      return extractEmailsFromArray(words)[0];
    }
  } catch (err) {

    }
  
  
}

  console.log("               ----------- parsing CV " + CVIndex++ + "-----------");


  console.log("Found names:", findName());
  console.log("Found phones:", findPhone());
  console.log("Found emails:", findEmail());
  console.log("Found links:", links);
  // console.log("Found organizations:", organizations);
  // console.log("Found nouns:", nouns);
  console.log("found job: ", findJob());
  console.log("Found country: ",findCountry());
  console.log("company: ", companies);

  console.log("============================================================")


});


}//loop to loop all documents



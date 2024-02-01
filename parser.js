const fs = require("fs");
const pdf = require("pdf-parse");
const nlp = require('compromise');
var path = require('path')
var textract = require('textract');
const { extractEmailsFromArray, extractNamesFromArray, extractPhoneNumbers, findCountry,findEmail,findJob,findName,findPhone, findLinks, findCompanies,searchForKeyword, searchForKeywordzz } = require("./parsing_functions");
var candidatez = require("./candidates");




var candidates =[];
// Specify the directory path
const directoryPath = './uploads';

// Read the contents of the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  files.forEach(file => {
    if (path.extname(file) == ".pdf") {
let dataBuffer = fs.readFileSync(directoryPath + "/" + file);

//accepted formats are +971 or 00971 or (00971) or any other country code, otherwise it will be rejected!

pdf(dataBuffer).then(function (data) {


    var AllResume = data.text;
    var words = AllResume.split("\n");
    words = words.filter(v=> v!= '');

  const doc = nlp(AllResume);

  //useful links 
  // https://www.npmjs.com/package/compromise
  //https://observablehq.com/@spencermountain/nouns


  
  if(searchForKeyword(words,"teacher")) {
    console.log(file);
  }
  console.log(searchForKeywordzz(words,['teacher','math','fullstack','flutter']));

let candidate =
{
    fileName: file,
    name: findName(doc,words),
    phone:  findPhone(doc,words),
    email: findEmail(doc,words),
    links: findLinks(doc),
    job: findJob(doc),
    country: findCountry(doc),
    company: findCompanies(doc),
};
candidates.push(candidate);

fs.writeFile(
  "candidatez.json",
  JSON.stringify(candidates),
  err => {
      // Checking for errors 
      if (err) throw err;

      // Success 
      // console.log("Done writing");
  });


});

    } else if(path.extname(file) == ".docx" || path.extname(file) == ".txt" ){

      const filePath = directoryPath + "/" + file;
      const config = {"preserveLineBreaks":true}

      textract.fromFileWithPath(filePath,config, function( error, text ) {
        

        var AllResume = text;
        var words = AllResume.split("\n");
        words = words.filter(v=> v!= '');        

        const doc = nlp(text);
        let candidate =
{
    fileName: file,
    name: findName(doc,words),
    phone:  findPhone(doc,words),
    email: findEmail(doc,words),
    links: findLinks(doc),
    job: findJob(doc),
    country: findCountry(doc),
    company: findCompanies(doc),
};
candidates.push(candidate);
fs.writeFile(
  "candidatez.json",
  JSON.stringify(candidates),
  err => {
      // Checking for errors 
      if (err) throw err;

      // Success 
      // console.log("Done writing");
  });
      }) //end of parsing docx & txt file    
    }

});//loop to loop all documents
}); //end of read file


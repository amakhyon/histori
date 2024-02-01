
const nlp = require('compromise');
   
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
  function findJob(doc){
    let jobs = doc.match('#Actor #Singular').json();
    try{
      return jobs[0].text;
    } catch(err) {
  
    }
  }
  
  function findCountry(doc){
    const country = doc.match('#place #country').json();
    try{
      return country[0].text;
    } catch(err) {
  
    }
  }
  function findName(doc,words){
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
  
  function findPhone(doc,words){
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
  function findEmail(doc,words){
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
  function findLinks(doc){
    return doc.urls().out('array');
  }

  function findJob(doc){
  
    let jobs = doc.match('#Actor #Singular').json();
    try {
        return jobs[0].text;
    } catch (err){

    }
  }

  function findCompanies(doc){
    return doc.match('#Organization #Company').json();
  }
  
  module.exports =  {
    extractEmailsFromArray, extractNamesFromArray, extractPhoneNumbers, findCountry,findEmail,findJob,findName,findPhone, findLinks, findJob, findCompanies
  }
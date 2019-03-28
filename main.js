const fs = require("fs")

// Read the input text file with the standard filesystem module
fs.readFile('data.txt', 'utf-8', (error, file) => {

    // If there was an error reading the file, log it to console and return false
    if (error) { console.error(error); return false; }

    // Create array of lines in file by splitting file at newline control character
    const lines = file.split('\n')

    // Iterate over lines and log a 1 for a valid line and 0 for an invalid line
    for (let line of lines) {
        if (isValidLine(line)) {
            console.log(1);
        } else {
            console.log(0);
        }
    }
});

// Function to determine if a given line is valid
function isValidLine(line) {

    // Split the line by the defined delimeter (pipe) so we can access the first name
    // with values[0], email with values[1], etc
    const values = line.split('|');

    // Check validity of name
    const name_reg = /[A-Z][a-z]+ [A-Z][a-z]+/
    const name_test = name_reg.exec(values[0])
    if (!name_test || name_test[0] != values[0]) {
        return false;
    }

    // Check validity of email
    const email_reg = /[a-zA-Z][\w.-]*@[\w.-]+\.[a-zA-Z]+/
    const email_test = email_reg.exec(values[1])
    if (!email_test || email_test[0] != values[1]) {
        return false;
    }

    // Check validity of address
    const address_reg = /\d+ [\w ]+, \w+, [A-Z]{2}, \d{5}/
    const address_test = address_reg.exec(values[2])
    if (!address_test || address_test[0] != values[2]) {
        return false;
    }

    // Check validity of phone number
    const phone_reg = /\d{10}/
    const phone_test = phone_reg.exec(values[3])
    if (!phone_test || phone_test[0] != values[3].trim()) {
        return false;
    }
    
    return true;
}
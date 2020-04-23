/**
 * function to download csv file of a user's test results.
 * creates an 'a' tag, and adds attributes to the 'a', which is the text encoded as CSV.
 * downloads the file 'filename'
 * triggers click in browser to commence download
 * @param filename- the filename that you want to download  
 * @param csv- the data that you want to download  
 */
function downloadFile(filename, csv) {
  let hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.download = filename;
  hiddenElement.click();
}
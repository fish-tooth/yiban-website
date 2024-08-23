export const formatDate = (date: String) => {
  if(date == '') {
    console.log("Date should not be null.");
    return 
  }
  if(date.includes('/')) {
    date = date.replace(/\//g, '-');
  }
  if(date.includes('.')) {
    date = date.replace(/\./g, '-');
  }
  return date.slice(5,)
}
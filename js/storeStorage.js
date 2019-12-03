function saveStorage(key,val) {
  var str = JSON.stringify(val);
  localStorage.setItem(key, str);
}

function getStorage(key) {
  if (!localStorage.getItem(key)) {
  }
  var str = localStorage.getItem(key);
  return JSON.parse(str);
}

export function initializeApp() {
  return new Promise((resolve, reject) => {
    console.table({
      "Angular Version": '16'
    })
    resolve('App Initilaization ');
  });
}

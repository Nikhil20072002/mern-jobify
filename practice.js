const promise = new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        if (success) {
            resolve('success')
        }
        else {
            reject('error')
        }
    }, 2000)

})

promise.then((message) => {
    console.log(message);

}).catch(error => console.log(error))
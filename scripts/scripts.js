function testRequest(method, url, data){
    fetch (`http://127.0.0.1:3000/api${url}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: method,
        body:JSON.stringify(data)
    }).then(res =>{
        return res.json()
    }).then(data =>{
        console.log(data);
    })
}

// testRequest("PUT", '/moods/2', {year:2009, data:[]})


function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}
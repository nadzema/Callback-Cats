d3.json("http://127.0.0.1:5000/ba_day")
    .then(function(data){
        console.log(data)
    })
    .catch(console.log("caught"))

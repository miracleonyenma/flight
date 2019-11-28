const flightLoc = document.querySelector("#flight-location");
const flightDest = document.querySelector("#flight-destination");
var listEl = document.querySelectorAll(".flights li");
// const dataList = document.querySelectorAll(".flights");

//helper function for attributes

const setAttributes = (el, attr) => {
    for(i in attr){
        el.setAttribute(i, attr[i] )
    };
}

const insertListVal = (targetEl)=>{
    for(let i = 0; i < listEl.length; i++){
        listEl[i].addEventListener("click", (e)=>{
            const optionalval = e.target.innerText;
            // console.log(targetEl);
            targetEl.value = optionalval;
        })
    }
}

const populateList = (data, element) => {
    // console.log("populate list called");
    const dataList = element.target.parentNode.querySelector(".flights");
    const inputField = element.target.parentNode.querySelector("input");
    
    //while dataList has an element.. delete it
    while(dataList.firstChild){
        dataList.removeChild(dataList.firstChild);
    };
    for(let i = 0; i < data.length; i++){
        var li = document.createElement("li");
        li.innerText = data[i].name;
        setAttributes(li, {value : data[i].name});
        dataList.appendChild(li);

        listEl = dataList.querySelectorAll("li");
    };
    insertListVal(inputField);
}

const getData = (e)=>{
    var val = e.target.value; 
    // console.log(val);

    fetch(`https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text?text=${val}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
            "x-rapidapi-key": "9104995521mshf760017fb7f1372p11d073jsn7172ff8111e1"
        }
    })
    .then( res => {
        res.ok ? console.log("SUCCESS") : console.log("ERROR");
        return res.json();
    })
    .then( data => {
        // console.log(data);
        populateList(data, e);
    });
}





flightLoc.addEventListener("input", getData);
flightDest.addEventListener("input", getData);



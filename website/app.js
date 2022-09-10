// Create a new date instance dynamically with JS
let date = new Date().toDateString();

/* Global Variables */
let err = document.getElementById("err");
let btn = document.getElementById("generate");

//define api
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=58dc397350b4c0c627a975f6654d5241&units=metric";

//define server
const server = "http://127.0.0.1:4000";




//function to display popup for 4s then disappear
let popupAppear = () => {

    //shown class has an animation to appear
  err.classList.add("shown");
  setTimeout(() => {
    err.classList.remove("shown");
  }, 4000);
};

//function to get data from Api 
const generateFunction = () => {
    
    const feeling = document.getElementById("feelings");
    const zipInp = document.getElementById("zip");

  weatherData(zipInp.value).then((data) => {

    if (data) {
        //i use desturcturing to save every wanted data in variable
      let {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

    let  info={}

       info = {
        date,
        city,
        temp,
        description,
        feelings: feeling.value
      };
console.log(info)   

        postData(server + "/add", info);

      // to make inputs empty after clicking
      setTimeout(() => {
        feeling.value = "";
        zipInp.value = "";
      }, 0);

    

    }
  });
};

/* input validation
 to make data only sent if zipInp and feelings aren't empty
 */
btn.addEventListener("click", () => {

  if (   document.getElementById("zip").value != "") {
    generateFunction();
  } else {
    popupAppear();
    err.innerHTML = "you must enter ZIP Code ";
  }
});

//get function to get data from Api
const weatherData = async (zip) => {
  try {
    const respose = await fetch(baseURL + zip + apiKey);

    const data = await respose.json();
    if (data.cod != 200) {
      err.innerHTML = data.message;
      popupAppear();
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};

//post function to post data
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  try {
    const newData = await res.json();
    
    showData();   

    return newData;
  } catch (err) {
    console.log(err);
  }
};


// showning data on UI
const showData = async () => {
    try {
      const res = await fetch(server + "/all");
    const data = await res.json();

    document.getElementById("date").innerText = `date: ${data.date}`;
    document.getElementById("city").innerText = `city: ${data.city}`;
    document.getElementById("temp").innerText = `temp: ${data.temp} °C`;
    document.getElementById("description").innerText 
    = `description: ${data.description}`;

    //check if the user entered his feeling   
    document.getElementById("content").innerText =
     data.feelings!=""? `feeling: ${data.feelings}`:'';

  } catch (err) {
    console.log(err);
  }
};

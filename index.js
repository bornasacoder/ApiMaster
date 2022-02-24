console.log("welcome to apimaster in javascript");
// utility function
// 1. utility function to get dom element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
  //    console.log(div);
  //     console.log(div.firstChild);
    return div.firstElementChild;
}

// initialize no of parameter 
let addedparamcount = 0;

// hide the parameter box initially
let parameterbox = document.getElementById('parameterbox');
parameterbox.style.display = "none";

// if the users clicks on the params box , hide the json box
let paramsradio = document.getElementById('paramradio');
paramsradio.addEventListener('click', () => {
    document.getElementById('jsonbox').style.display = 'none';
    document.getElementById('parameterbox').style.display = 'block';
});

// if the users clicks on json box , hide the params box 
let jsonradio = document.getElementById('jsonradio');
jsonradio.addEventListener('click', () => {
    document.getElementById('jsonbox').style.display = 'block';
    document.getElementById('parameterbox').style.display = 'none';
});

// if the user clicks on + button , add more parameter
let addparam = document.getElementById('addparam');
addparam.addEventListener('click', () => {
    let params = document.getElementById('param');
    let string = `<div class="form-row my-2">
    <legend class="col-form-label col-sm-2 pt-0">Parameter ${addedparamcount + 2}</legend>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterkey${addedparamcount + 2}" placeholder="Enter Parameter${addedparamcount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parametervalue${addedparamcount + 2}" placeholder="Enter Parameter${addedparamcount + 2} Value">
    </div>
    <button id="deleteparam" class="btn btn-primary deleteparam"> - </button>
</div>`;
  
    //convert the element string to dom node
    let paramelement = getElementFromString(string);

    // console.log(paramelement);
    params.appendChild(paramelement);
 //  console.log(params);

    //add an event listener to remove the paramter in clicking  - button
    let deleteparam = document.getElementsByClassName('deleteparam');
   // console.log(deleteparam);
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
           console.log(e.target.parentElement);
            // todo : add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }
    addedparamcount++;
});


let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in the response box to request patience from the user
//    document.getElementById('responsejsontext').value = "Please wait..fetching response...";
    document.getElementById('responseprism').innerHTML = "Please wait..fetching response...";


    // fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requesttype = document.querySelector("input[name='requesttype']:checked").value;
    let contenttype = document.querySelector("input[name='contenttype']:checked").value;

    // if user has used params option instead of json , collect all the parameter in an object 
    if (contenttype == 'params') {
        data = {};
        for (let i = 0; i < addedparamcount + 1; i++) {
            if (document.getElementById('parameterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterkey' + (i + 1)).value;
               // console.log(key);
                let value = document.getElementById('parametervalue' + (i + 1)).value;
               // console.log(value);
                data[key] = value;

            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestjsonbox').value;
    }

     // log all the values in the console for debugging
    console.log('url is', url);
    console.log('request is ', requesttype);
    console.log('content is', contenttype);
    console.log('data is', data);

    // if the request type is get , invoke fetch api to create a get request 
    if(requesttype =='GET'){
      fetch(url, {
          method: 'GET',
      })
      .then(response=> response.text())
      .then((text)=> {
        //   document.getElementById('responsejsontext').value = text;
        document.getElementById('responseprism').innerHTML = text;

      });
    }
     else{
         fetch(url, {
             method: 'POST',
             body: data,
             headers: {
                 "Content-type": "application/json; charset=UTF-8"
             }
         })
         .then(response=> response.text())
         .then((text) => {
            //  document.getElementById('responsejsontext').value = text;

            document.getElementById('responseprism').innerHTML = text;

         });
     }
});


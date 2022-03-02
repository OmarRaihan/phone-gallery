



// Search Field
const searchPhone = () => {
    document.getElementById('phone-details').innerHTML = '';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;


    // Error Handle 
    const error = document.getElementById('error');
    if(searchText == ""){
      error.innerText = "No result found";
    }
    else if(searchText <= 0){
      error.innerText = "Enter positive number";
    }
    
    // Clear Data
    searchField.value = '';

    // Load Data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data.slice(0, 20)))
}


// Search Result
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    
    // Clear Search Box
    searchResult.textContent = '';


    // Result Data
    data.forEach(slug => {
        const div = document.createElement('div');
        div.classList.add('col');
          div.innerHTML = `
        <div class="card border-0 p-4 rounded-3 h-100">
            <img src="${slug.image}" class="card-img-top my-4" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">${slug.phone_name}</h5>
              <h6 class="my-1 text-center">${slug.brand}</h6>
              <div class="text-center">
                <button onclick="phoneDetail('${slug.slug}')" type="button" class="btn btn-info my-2 px-5 text-white">Details</button>
              </div>
            </div>
          </div>
        `;
        searchResult.appendChild(div);
    })
}



// Phone Details
const phoneDetail = phoneId => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

  fetch(url)
  .then(res => res.json())
  .then(data => displayPhoneDetails(data.data));
}


// Details Display
const displayPhoneDetails = phone => {
  // console.log(phone);
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <div class="card px-lg-5 px-sm-2 rounded-3 border-0 h-100 my-5">

      <div>
      <img src="${phone.image}" class="card-img-top my-4" alt="...">
      </div>

        <div class="card-body">
          <h4 class="card-title text-center">${phone.name}</h4>
          <h6 class="my-2 text-center">${phone.brand}</h6>
        <div class="text-center">
        
            <p><b>Release Date: </b>${phone.releaseDate ? phone.releaseDate : "No date found"}</p>

            <h4><b>Main Features:</b></h4>
            <p><b>Storage: </b>${phone.mainFeatures.storage}</p>
            <p><b>Display Size: </b>${phone.mainFeatures.displaySize}</p>
            <p><b>Chip Set: </b>${phone.mainFeatures.chipSet}</p>
            <p><b>Memory: </b>${phone.mainFeatures.memory}</p>

            <h5><b>Sensors:</b></h5>
            <p>${phone.mainFeatures.sensors}</p>

            <h5><b>Others:</b></h5>
            <p><b>WLAN: </b>${phone.others.WLAN}</p>
            <p><b>Bluetooth: </b>${phone.others.Bluetooth}</p>
            <p><b>GPS: </b>${phone.others.GPS}</p>
            <p><b>NFC: </b>${phone.others.NFC}</p>
            <p><b>Radio: </b>${phone.others.Radio}</p>
            <p><b>USB: </b>${phone.others.USB}</p>
        </div>
  </div>
  `;
  phoneDetails.appendChild(div);
};

// THE END
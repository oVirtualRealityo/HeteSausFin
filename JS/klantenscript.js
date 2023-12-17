// Aantal personen om te tonen en de API-Link
const numberOfResults = 12;
const apiUrl = 'https://randomuser.me/api/?inc=gender,name,location,nat,dob,picture&results=500';
const sauceArray = [
  "Jalapeno Squeezings", "X-tra Terrestrial heat", "Curse of the desert", "Minotaurs Secret", "Habanero Nomad", "Fiery Assteroid", "Tropical Heatwave", "Himalayan Gold", "Verse Jalapeno's", "Verse Habanero's", "Verse Ghost peppers", "Verse Chilli's"
]
function randomizer(maxInt){
  return Math.floor(Math.random() * maxInt)

}

// Functie om de data die we aanroepen te processeren
function processData(users, limit) {
    console.log('Data from API:', users); // de array weergeven op de console voor controle achteraf, als de array geladen wordt en de elementen niet weten we dat het probleem in de functie zit.
      const customerContainer = document.getElementById('customerContainer')
      for (let i = 0; i < Math.min(users.length, limit); i++) {
    const user = users[i];
    // Hier ga ik de elementen aanmaken voor de personen in op te slaan. deze maken we een article en geven we ineens een classname mee voor manipulatie in css
//// OP SUGGESTIE VAN MVR LETTANY: Een randomizer voor elke klant om een saus te genereren waar deze een fan van is.
      let randomSauceInt = randomizer(sauceArray.length);
      let randomSauceName = sauceArray[randomSauceInt];
      const userBox = document.createElement('article');
      let customerList = document.createElement('ul');
      let customerFigure = document.createElement('figure');
      let customerApp = document.createElement('section');
    // De sublistelementen zoals naam, aanspreking , leeftijd etc
      let customerFirstName = document.createElement('li');
      let customerLastName = document.createElement('li');
      let customerAge = document.createElement('p');
      let customerCountry = document.createElement('li');
      let customerTitle = document.createElement('li'); 
      let customerGender = document.createElement('li');
      let customerLocation = document.createElement('p');
      let customerIMG = document.createElement('img');
    // De elementen beginnen "aankleden"
      customerFirstName.textContent =" Voornaam: " + user.name.first;
      customerLastName.textContent ="Achternaam: " + user.name.last;
      // de geboortedatum eruit halen en trimmen: 
      let ageCustomerDate = user.dob.date;
      customerLocation.textContent = user.name.first + " is verzot van " + randomSauceName;
      ageCustomerDate = ageCustomerDate.substring(0,10);
      customerAge.innerHTML = " Leeftijd: " + parseInt(user.dob.age) + "Jaar " + " | " + " | " + "  Geboren op: " + ageCustomerDate;
      customerCountry.textContent = " Nationaliteit: " + user.nat + ", " + user.location.country;
      customerTitle.textContent = "Aanspreektitel: " + user.name.title;
      customerGender.textContent = " Geslacht: " + user.gender;
    // de elementen aan de UL hangen in correcte volgorde
      customerList.appendChild(customerTitle);
      customerList.appendChild(customerFirstName);
      customerList.appendChild(customerLastName);
      customerList.appendChild(customerGender);
      customerList.appendChild(customerCountry);
      
    // de andere elementen finaliseren
      customerIMG.src = user.picture.large;
      customerApp.appendChild(customerAge);
      customerApp.appendChild(customerLocation);
      customerFigure.appendChild(customerIMG);
      // Deze box heeft een classtitel mee voor een grid te definieren voor alles wat we er net hebben ingezet mee weg te werken en te organiseren.
      userBox.classList.add('customer');
      // dan hangen we de volgende elementen eraan: img, ul, p
      userBox.appendChild(customerFigure);
      userBox.appendChild(customerList);
      userBox.appendChild(customerApp); 
    
      // Dan de magische stap: de input inserten in de html. dit gebeurt heel simpel daar aan de container die we eerder hebben verklaard de userBox met dus alle data en elementen in te koppelen aan de html. dit heeft als resultaat dat de eerder gegenereerde UserBox dus voor elk lid dat we specifieren in de api url ingeladen wordt.
      customerContainer.appendChild(userBox);
    };
  
    // Vervolgens log ik op de console hoeveel users er geladen zijn zodat we makkelijk kunnen nakijken of alles werkt.
    console.log('Number of users:', users.length);
  }
  
// de plek van waar ik api aanroep met een fetch functie. de api url hebben we eerder hier vanboven opgeslagen als variabele voor gebruiksgemak.//
fetch(apiUrl)
// als de fetch begonnen is kijken we wat we terugkrijgen als response
  .then(response => {
    if (!response.ok) {
      // als de response niet oke is sturen we een error. dit doe ik in het engels om dat dit de standaard is voor errors
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    const users = data.results;
    // de variabelen meegeven, de tweede variabele is een limiet zodat we snel en gemakkelijk de hoeveelheid getoonde klanten kunnen zien zonder de url aan te passen.
    processData(users, numberOfResults);
  })
  // een catch voor de error op te vangen en te loggen, wederom in het engels.
  .catch(error => {
    console.error('There was a problem fetching data:', error.message);
  });
  
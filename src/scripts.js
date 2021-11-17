// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here!!');

import { getAllData } from './api-calls';
import Traveler from './Traveler';
import domUpdates from './dom-updates';

const searchButton = document.getElementById('searchButton');
const acceptButton = document.getElementById('acceptButton');
const cancelButton = document.getElementById('cancelButton');
const estimatedCost = document.getElementById('estimatedCost');
const userInputForm = document.getElementById('userInputForm');
const backButton = document.getElementById('backButton');
const pendingTripsButton = document.getElementById('pendingTripsButton');
const allTripsButton = document.getElementById('allTripsButton');
const loginForm = document.getElementById('loginForm');
const userNameInput = document.getElementById('userName');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const loginTitle = document.getElementById('loginTitle');
const tripInputContainer = document.getElementById('tripInputContainer');
const tripSelectorContainer = document.getElementById('tripSelectorContainer');

let allData;
let currentTraveler;

const checkLoginInfo = (event) => {
  event.preventDefault();
  getData();
  const id = parseInt(userNameInput.value.slice(8));
  if (checkLoginInputsAreFilled() && validateUserName() && validatePassword()) {
    createTraveler(id);
    domUpdates.hide(loginTitle);
    domUpdates.hide(loginForm);
    domUpdates.display(tripInputContainer);
    domUpdates.display(tripSelectorContainer);
    domUpdates.changeMainView();
    intializeData();
  }
}

const createTraveler = (id) => {
  currentTraveler = new Traveler(allData[0][id - 1], allData[2], allData[3]);
}

const checkLoginInputsAreFilled = () => {
  if (!userNameInput.value || !passwordInput) {
    loginErrorMessage.innerText = 'Please Fill Out All Sections!';
    domUpdates.display(loginErrorMessage);
    setTimeout(() => {
      domUpdates.hideResponse(loginErrorMessage, loginForm);
    }, 2000);
  } else {
    return true;
  }
}

const validateUserName = () => {
  if (userNameInput.value.length < 9 || userNameInput.value.length > 10 || !userNameInput.value.includes('traveler')) {
    loginErrorMessage.innerText = 'Invalid Username!';
    domUpdates.display(loginErrorMessage);
    setTimeout(() => {
      domUpdates.hideResponse(loginErrorMessage, loginForm);
    }, 2000);
  } else {
    return true;
  }
}

const validatePassword = () => {
  if (passwordInput.value !== 'travel') {
    loginErrorMessage.innerText = 'The Password Was Wrong. Please Try Again!';
    domUpdates.display(loginErrorMessage);
    setTimeout(() => {
      domUpdates.hideResponse(loginErrorMessage, loginForm);
    }, 2000);
  } else {
    return true;
  }
}

const getData = () => {
  getAllData()
    .then(data => {
      allData = data;
    });
}

const intializeData = () => {
  displayAllTrips();
  domUpdates.greetUser(currentTraveler);
  domUpdates.displayAmountSpentYearly(currentTraveler);
  domUpdates.addDestinationOptionsToDropdown(allData[3]);
}

const checkForm = (event) => {
  event.preventDefault();
  if (domUpdates.checkInputValidation()) {
    domUpdates.createNewTrip(allData, currentTraveler);
  }
}

const acceptTripRequest = () => {
  domUpdates.sendTripRequest(currentTraveler);
  domUpdates.hide(cancelButton);
  domUpdates.hide(acceptButton);
  domUpdates.display(backButton);
}

const renderForm = () => {
  domUpdates.hideResponse(estimatedCost, userInputForm);
  domUpdates.hide(acceptButton);
  domUpdates.hide(backButton);
  domUpdates.hide(cancelButton);
  domUpdates.display(userInputForm);
}

const displayPendingTrips = () => {
  domUpdates.changeToPendingTrips(currentTraveler);
}

const displayAllTrips = () => {
  domUpdates.changeToApprovedTrips(currentTraveler.trips);
}

window.addEventListener('load', getData);
searchButton.addEventListener('click', checkForm);
acceptButton.addEventListener('click', acceptTripRequest);
cancelButton.addEventListener('click', renderForm);
backButton.addEventListener('click', renderForm);
pendingTripsButton.addEventListener('click', displayPendingTrips);
allTripsButton.addEventListener('click', displayAllTrips);
loginButton.addEventListener('click', checkLoginInfo);
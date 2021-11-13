const getData = (dataUrl, objName) => {
  const retrievedData = fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
      return data[objName] || data;
    })
    .catch(error => console.log(error));
  return retrievedData;
}

const getAllData = () => {
  const getAllTravelersData = getData('http://localhost:3001/api/v1/travelers', 'travelers');
  const getSingleTravelerData = getData('http://localhost:3001/api/v1/travelers/1');
  const getAllTripsData = getData('http://localhost:3001/api/v1/trips', 'trips');
  const getAllDestinationsData = getData('http://localhost:3001/api/v1/destinations', 'destinations');
  const allPromise = Promise.all([getAllTravelersData,getSingleTravelerData, getAllTripsData, getAllDestinationsData]).then(data => data);
  return allPromise;
}

export { getAllData }
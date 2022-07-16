import backupData from '../../assets/data.json';

export default function fetchData(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => {
        if (response.ok && response.status === 200) {
          return response.json();
        }
        throw new Error('Bad request to API - data not received');
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        // If an error occurs when requesting the data, load from file
        console.error('Error when trying to fetch data from API: ', err);
        resolve(backupData);
      });
  });
}

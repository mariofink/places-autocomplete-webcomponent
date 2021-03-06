export default class PlacesService {
  constructor(autocompleteService) {
    if (!autocompleteService) throw new Error("NoServiceAvailable");
    this.autocompleteservice = autocompleteService;
  }

  autocomplete(input) {
    return new Promise((resolve, reject) => {
      const query = { input };
      this.autocompleteservice.getPlacePredictions(query, (results, status) => {
        if (status === "OK") {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }
}

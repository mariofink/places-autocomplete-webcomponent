import PlacesService from "./PlacesService";

const autocompleteMockOK = {
  getPlacePredictions: (query, callback) => {
    callback("success", "OK");
  },
};

const autocompleteMockNotOK = {
  getPlacePredictions: (query, callback) => {
    callback("failure", "NOTOK");
  },
};

describe("PlacesService", () => {
  test("throws when no service is passed in", () => {
    expect(() => new PlacesService()).toThrow("NoServiceAvailable");
  });
  test("Resolves when service is returning OK", () => {
    const svc = new PlacesService(autocompleteMockOK);
    expect(svc.autocomplete("myquery")).resolves.toEqual("success");
  });
  test("Rejects when service is not returning OK", () => {
    const svc = new PlacesService(autocompleteMockNotOK);
    expect(svc.autocomplete("myquery")).rejects.toEqual("NOTOK");
  });
});

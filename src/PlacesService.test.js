import PlacesService from "./PlacesService";

test("PlacesService throws when no service is passed in", () => {
  expect(() => new PlacesService()).toThrow("NoServiceAvailable");
});

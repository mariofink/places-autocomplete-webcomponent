import { LitElement, html, css } from "lit-element";
import _ from "lodash";
import PlacesService from "./PlacesService";

export class PlacesAutocomplete extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
      suggestions: { type: Array },
    };
  }

  constructor() {
    super();
    this.suggestions = [];
    this.placesService = new PlacesService(
      new google.maps.places.AutocompleteService()
    );
    this.autocomplete = _.debounce(() => {
      this.placesService.autocomplete(this.value).then((result) => {
        console.log(result);
        this.suggestions = result;
      });
    }, 100);
  }
  static get styles() {
    return css`
      label {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <label for="placesearch">${this.label}</label>
      <input
        type="search"
        id="placesearch"
        placeholder=${this.placeholder}
        @keyup=${this._onChange}
      />
      <ul>
        ${this.suggestions.map((i) => html`<li>${i.description}</li>`)}
      </ul>
    `;
  }

  _onChange(e) {
    this.value = e.target.value;
    this.autocomplete();
  }
}

window.customElements.define("places-autocomplete", PlacesAutocomplete);

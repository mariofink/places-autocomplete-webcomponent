import { LitElement, html, css } from "lit-element";
import _ from "lodash";
import PlacesService from "./PlacesService";

export class PlacesAutocomplete extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
      suggestions: { type: Array, attribute: false },
      selection: { type: Number, attribute: false },
    };
  }

  constructor() {
    super();
    this.suggestions = [];
    this.selection = 0;
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
      .selected {
        background: deeppink;
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
        @keyup=${this._onKeyUp}
      />
      <ul>
        ${this.suggestions.map(
          (suggestion, index) =>
            html`<li class="${index === this.selection ? "selected" : ""}">
              ${suggestion.description}
            </li>`
        )}
      </ul>
    `;
  }

  _onEnter() {
    const event = new CustomEvent("place:change", {
      detail: this.suggestions[this.selection],
    });
    this.dispatchEvent(event);
  }

  _onKeyUp(e) {
    console.log("EVENT", e);
    this.value = e.target.value;
    switch (e.key) {
      case "ArrowUp":
        if (this.selection > 0) this.selection--;
        break;

      case "ArrowDown":
        if (this.selection + 1 < this.suggestions.length) this.selection++;
        break;

      case "Enter":
        this._onEnter();

      default:
        this.autocomplete();
        break;
    }
  }
}

window.customElements.define("places-autocomplete", PlacesAutocomplete);

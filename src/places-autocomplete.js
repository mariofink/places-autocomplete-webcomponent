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
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        cursor: pointer;
        padding: 1rem;
      }
      li:hover {
        background: pink;
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
            html`<li
              class="${index === this.selection ? "selected" : ""}"
              @click=${() => this._onClick(index)}
            >
              ${suggestion.description}
            </li>`
        )}
      </ul>
    `;
  }

  _onChange() {
    const event = new CustomEvent("place:change", {
      detail: this.suggestions[this.selection],
    });
    this.dispatchEvent(event);
  }

  _onClick(selection) {
    this.selection = selection;
    this._onChange();
    // focus on the input just in case, so that you could continue selection with the keyboard
    this.shadowRoot.querySelector("input").focus();
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
        this._onChange();

      default:
        this.autocomplete();
        break;
    }
  }
}

window.customElements.define("places-autocomplete", PlacesAutocomplete);

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { atom } from "nanostores";
import { useStores } from "../src";

const isCartOpen = atom(false);

@customElement("single-demo-usestores")
@useStores(isCartOpen)
export class SingleDemo extends LitElement {
  render() {
    return html`
      <h3>Single</h3>
      <input
        type="checkbox"
        .checked=${isCartOpen.get()}
        @change=${() => {
          isCartOpen.set(!isCartOpen.get());
        }}
      />
    `;
  }
}

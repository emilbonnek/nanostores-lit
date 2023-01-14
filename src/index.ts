export { StoreController } from "./StoreController";
export { StoresController } from "./StoresController";
export { useStores } from "./useStores";

// Tuples unwrapped
const tuple: [number, number, string] = [1, 2, "hey"];

// Function
function identityTuple<T extends Array<unknown>>(tuple: T): T {
  return tuple;
}

identityTuple(tuple); // Type is [number, number, string]

// Class
class Tuple<T extends Array<unknown>> {
  constructor(private tuple: T) {}

  identity(): T {
    return this.tuple;
  }
}
new Tuple(tuple).identity(); // Type is [number, number, string]

// Tuples wrapped
const tuple2: [number, number, string] = [1, 2, "hey"];

type Wrap = {};

// Test stuff
import { atom, WritableAtom } from "nanostores";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { StoresController } from "./StoresController";

const count = atom(0);
const name = atom("John");

const observedAtoms: [WritableAtom<number>, WritableAtom<string>] = [
  count,
  name,
];

@customElement("my-element")
class MyElement extends LitElement {
  private storesController = new StoresController(this, observedAtoms);

  render() {
    const vals = this.storesController.values;
    vals;
    return html`Count: ${count.get()}`;
  }
}

export { StoreController } from "./StoreController";
export { MultiStoreController as StoresController } from "./MultiStoreController";
export { useStores } from "./useStores";

/* // Tuples unwrapped
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
import { MultiStoreController } from "./MultiStoreController";

const countAtom = atom<number>(0);
const nameAtom = atom<string>("John");

const observedAtoms = [countAtom, nameAtom] as const;

function getAtomValues<TAtoms extends ReadonlyArray<WritableAtom<unknown>>>(
  atoms: TAtoms
): { -readonly [K in keyof TAtoms]: ReturnType<TAtoms[K]["get"]> } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vals = atoms.map(<T>(atom: WritableAtom<T>) => atom.get()) as any;
  return vals;
}

getAtomValues(observedAtoms);

@customElement("my-element")
class MyElement extends LitElement {
  private storesController = new MultiStoreController(this, observedAtoms);

  render() {
    const vals = this.storesController.values;

    const [count, name] = vals;
    return html`Count: ${countAtom.get()}`;
  }
}
 */

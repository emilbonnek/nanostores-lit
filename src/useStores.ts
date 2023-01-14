/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactiveControllerHost } from "lit";
import { WritableAtom } from "nanostores";
import { StoreController } from ".";

type Constructable<T> = new (...args: any[]) => T;

/**
 * @decorator `@useStores`
 * A decorator that creates a new `StoreController` for each atom
 * and adds it to the host element.
 * @param atoms The atoms to subscribe to.
 * @returns A class decorator that adds a `StoreController` for each atom.
 * @example
 * ```ts
 * import { atom } from 'nanostores';
 * import { useStores } from 'nanostores/lit';
 * import { LitElement, html } from 'lit';
 * import { customElement } from 'lit/decorators.js';
 *
 * const count = atom(0);
 *
 * @customElement('my-element')
 * @useStores(count)
 * class MyElement extends LitElement {
 *  render() {
 *   return html\`Count: \${count.get()}\`;
 *   }
 * }
 * ```
 */
export function useStores<TAtoms extends Array<WritableAtom<unknown>>>(
  ...atoms: TAtoms
) {
  return <TConstructor extends Constructable<ReactiveControllerHost>>(
    constructor: TConstructor
  ) => {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        // Create a new StoreController for each atom
        for (const atom of atoms) {
          new StoreController(this, atom);
        }
      }
    };
  };
}

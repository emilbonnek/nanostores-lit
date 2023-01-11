/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactiveController, ReactiveControllerHost } from "lit";
import { WritableAtom } from "nanostores";

/**
 * A `ReactiveController` that subscribes a `LitElement` to a `nanostores` atom and updates the host element when the atom changes.
 *
 * @example
 * ```ts
 * import { atom } from 'nanostores';
 * import { StoreController } from 'nanostores/lit';
 * import { LitElement, html } from 'lit';
 * import { customElement } from 'lit/decorators.js';
 *
 * const count = atom(0);
 *
 * @customElement('my-element')
 * class MyElement extends LitElement {
 * private controller = new StoreController(this, count);
 *  render() {
 *   return html\`Count: \${this.controller.value}\`;
 *  }
 * }
 * ```
 */
export class StoreController<AtomType> implements ReactiveController {
  private unsubscribe: undefined | (() => void);

  get value() {
    return this.atom.get();
  }

  constructor(
    private host: ReactiveControllerHost,
    private atom: WritableAtom<AtomType>
  ) {
    host.addController(this);
  }

  // Subscribe to the atom when the host connects
  hostConnected() {
    this.unsubscribe = this.atom.subscribe(() => {
      this.host.requestUpdate();
    });
  }

  // Unsubscribe from the atom when the host disconnects
  hostDisconnected() {
    this.unsubscribe?.();
  }
}

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
export function useStores(...atoms: WritableAtom<unknown>[]) {
  return <T extends new (...args: any[]) => ReactiveControllerHost>(
    constructor: T
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

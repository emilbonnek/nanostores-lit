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

  /**
   * The current value of the atom.
   * @readonly
   */
  get value(): AtomType {
    return this.atom.get();
  }
}

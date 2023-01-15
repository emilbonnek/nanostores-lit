import { ReactiveController, ReactiveControllerHost } from "lit";
import { WritableAtom } from "nanostores";

export class MultiStoreController<TAtoms extends Array<WritableAtom<unknown>>>
  implements ReactiveController
{
  private unsubscribes: undefined | (() => void)[];

  constructor(private host: ReactiveControllerHost, private atoms: TAtoms) {
    host.addController(this);
  }

  // Subscribe to the atom when the host connects
  hostConnected() {
    this.unsubscribes = this.atoms.map((atom) =>
      atom.subscribe(() => this.host.requestUpdate())
    );
  }

  // Unsubscribe from the atom when the host disconnects
  hostDisconnected() {
    this.unsubscribes?.forEach((unsubscribe) => unsubscribe());
  }

  /**
   * The current values of the atoms.
   * @readonly
   */
  get values(): {
    [K in keyof TAtoms]: ReturnType<TAtoms[K]["get"]>;
  } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.atoms.map(<T>(atom: WritableAtom<T>) => atom.get()) as any;
  }
}

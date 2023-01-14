import { ReactiveController, ReactiveControllerHost } from "lit";
import { WritableAtom } from "nanostores";

type UnwrappedAtom<Atom extends { get: () => any }> = Atom extends {
  get: () => infer AtomType;
}
  ? AtomType
  : never;

export class StoresController<TAtoms extends Array<WritableAtom>>
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
  get values(): unknown[] {
    const vals = this.atoms.map((atom) => atom.get());

    return vals;
  }
}

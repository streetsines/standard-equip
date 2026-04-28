import { useSyncExternalStore } from "react";

export type QuoteItem = {
  id: string;
  name: string;
  /** Plain-language label (e.g. "Skid steer / compact track loader") */
  commonName?: string;
  category: string;
  rateDay: number;
  startDate?: string;
  endDate?: string;
};

type State = {
  items: QuoteItem[];
  isOpen: boolean;
};

let state: State = { items: [], isOpen: false };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const quoteApi = {
  add(item: QuoteItem) {
    state = {
      ...state,
      isOpen: true,
      items: state.items.find((i) => i.id === item.id)
        ? state.items
        : [...state.items, item],
    };
    emit();
  },
  remove(id: string) {
    state = { ...state, items: state.items.filter((i) => i.id !== id) };
    emit();
  },
  updateDates(id: string, startDate?: string, endDate?: string) {
    state = {
      ...state,
      items: state.items.map((i) =>
        i.id === id ? { ...i, startDate, endDate } : i
      ),
    };
    emit();
  },
  open() {
    state = { ...state, isOpen: true };
    emit();
  },
  close() {
    state = { ...state, isOpen: false };
    emit();
  },
  clear() {
    state = { ...state, items: [] };
    emit();
  },
};

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return state;
}

// Hook that returns the whole state; combine with quoteApi externally for actions.
export function useQuoteStore<T>(selector: (s: State & typeof quoteApi) => T): T {
  // We re-create the merged object only when state changes (state is replaced on emit).
  return useSyncExternalStore(
    subscribe,
    () => {
      // attach api as non-enumerable stable methods via prototype-ish merge
      return selector(Object.assign(state, quoteApi) as State & typeof quoteApi);
    },
    () => selector(Object.assign(state, quoteApi) as State & typeof quoteApi)
  );
}

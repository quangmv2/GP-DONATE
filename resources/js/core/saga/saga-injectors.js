import checkStore from "./../../redux/checkStore";
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from "./constants";

// const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

export function injectSagaFactory(store, isValid) {
  return function injectSaga(key, descriptor, args) {
    if (!isValid) checkStore(store);

    if (typeof descriptor === "undefined") {
      descriptor = {};
    }

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || RESTART_ON_REMOUNT
    };
    const { saga, mode } = newDescriptor;

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== "production") {
      const oldDescriptor = store.injectedSagas[key];
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || (mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args)
      };
    }
  };
}

export function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) checkStore(store);
    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        if (process.env.NODE_ENV === "production") {
          store.injectedSagas[key] = "done";
        }
      }
    }
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  };
}

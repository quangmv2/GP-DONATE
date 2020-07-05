import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import getInjectors from "./saga-injectors";
import { DAEMON } from "./constants";
import { ReactReduxContext } from "react-redux";

export default ({ key, saga, mode = DAEMON }) => WrappedComponent => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withSaga(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;

    componentWillMount() {
      const { injectSaga } = this.injectors;
      injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;
      ejectSaga(key);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};

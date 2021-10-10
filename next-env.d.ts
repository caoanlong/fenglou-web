/// <reference types="next" />
/// <reference types="next/types/global" />

interface Navigator {
    standalone: any
}
interface Window { 
    analytics: any, 
    database: any, 
    gtag: any, 
    google_tag_data: any,
    google_tag_manager: any,
    navigator: Navigator,
    __REDUX_DEVTOOLS_EXTENSION__: any
}

declare module "redux-persist/integration/react" {
    import { ReactNode, PureComponent } from "react";
    import { Persistor } from "redux-persist/es/types";

    /** @see PersistGate */
    interface PersistGateProps {
        persistor: Persistor;
        onBeforeLift?(): void | Promise<void>;
        children?: ReactNode | ((bootstrapped: boolean) => ReactNode);
        loading?: ReactNode;
    }

    /** @see PersistGate */
    interface PersistorGateState {
        bootstrapped: boolean;
    }

    /**
     * Entry point of your react application to allow it persist a given store @see Persistor and its configuration.
     * @see Persistor
     * @see PersistGateProps
     * @see PersistGateState
     */
    class PersistGate extends React.PureComponent<PersistGateProps, PersistorGateState> {}
}
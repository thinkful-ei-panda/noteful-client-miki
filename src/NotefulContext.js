import React from 'react';
// Initially setting STORE as default for structural purposes
import STORE from './dummy-store';

const NotefulContext = React.createContext({
    STORE
});

export default NotefulContext;
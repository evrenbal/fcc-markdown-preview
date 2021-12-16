import { initStore } from 'hooks/use-store';

const configureStore = ( value: string = '' ) => {

  const actions = {
        SET: (value:string, newValue:string) => {
          return newValue;
        },
    };

    initStore('markdown', actions, value );
};

export default configureStore;
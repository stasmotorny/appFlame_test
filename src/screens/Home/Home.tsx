import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

import UsersList from './components/UsersList';
import {store} from '../../app/store';
import {NavigationProvider} from 'react-native-navigation-hooks/dist';

type THomeProps = {componentId: string};

const Home = ({componentId}: THomeProps) => (
    <NavigationProvider value={{componentId}}>
        <Provider store={store}>
            <SafeAreaView style={styles.root}>
                <UsersList />
            </SafeAreaView>
        </Provider>
    </NavigationProvider>
);

const styles = StyleSheet.create({root: {flex: 1}});

export default Home;

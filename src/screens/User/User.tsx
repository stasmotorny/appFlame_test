import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationProvider} from 'react-native-navigation-hooks/dist';
import {Provider, useSelector} from 'react-redux';
import {getUser} from '../../app/selectors/users';
import {store} from '../../app/store';
import UserBody from './components/UserBody/UserBody';

export type TUserProps = {componentId: string; id: number};

const User = ({componentId, id}: TUserProps) => {
    return (
        <NavigationProvider value={{componentId}}>
            <Provider store={store}>
                <SafeAreaView style={styles.root}>
                    <UserBody id={id} />
                </SafeAreaView>
            </Provider>
        </NavigationProvider>
    );
};

const styles = StyleSheet.create({
    root: {flex: 1},
});

export default User;

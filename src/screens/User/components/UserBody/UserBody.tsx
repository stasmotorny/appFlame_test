import React, {useCallback} from 'react';
import {Image, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {TUser} from '../../../../app/API';
import {getUser} from '../../../../app/selectors/users';
import {RootState} from '../../../../app/store';
import {ImagePlaceholder} from '../../../Home/components/ImagePlaceholder/ImagePlaceholder';
import styles from './styles';

export type TUserBodyProps = {
    id: number;
};

const UserBody = ({id: userId}: TUserBodyProps) => {
    const item = useSelector((state: RootState) => getUser(state, userId));
    const {avatar, name, id, age} = item;

    const renderDescription = useCallback(
        () => (
            <View style={styles.text}>
                <Text>id: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Age: {age}</Text>
            </View>
        ),
        [age, id, name],
    );

    const renderImage = useCallback(
        () => (
            <>
                <View style={styles.imageContainer}>
                    {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : <ImagePlaceholder />}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -16,
                            left: 0,
                            width: 40,
                            height: 40,
                        }}>
                        <Image
                            style={{width: 40, height: 40, opacity: 1}}
                            source={require('../../../../assets/heart_red.png')}
                        />
                    </View>
                </View>
            </>
        ),
        [avatar],
    );

    const renderBody = useCallback(() => {
        return (
            <View style={styles.body}>
                {renderImage()}
                {renderDescription()}
            </View>
        );
    }, [renderDescription, renderImage]);

    const renderContainer = useCallback(() => {
        return <View style={styles.container}>{renderBody()}</View>;
    }, [renderBody]);

    return <View style={styles.root}>{renderContainer()}</View>;
};

export default UserBody;

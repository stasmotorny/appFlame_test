import React, {useCallback, useEffect} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getUser} from '../../../../app/selectors/users';
import {RootState} from '../../../../app/store';
import {ImagePlaceholder} from '../../../Home/components/ImagePlaceholder/ImagePlaceholder';
import styles from './styles';
import {useAppDispatch} from "../../../../app/hooks";
import {likeUser} from "../../../../app/actions/users";

export type TUserBodyProps = {
    id: number;
};

const UserBody = ({id: userId}: TUserBodyProps) => {
    const dispatch = useAppDispatch();
    const items = useSelector((state: RootState) => state);

    const item = getUser(items, userId);

    const {avatar, name, id, age, isLiked} = item!;

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

    const onLikePress = (userId: number) => {
        dispatch(likeUser(userId));
    };

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
                        <Pressable onPress={() => {onLikePress(id)}}>
                            {isLiked ? (
                                <Image
                                    style={{width: 40, height: 40, opacity: 1}}
                                    source={require('../../../../assets/heart_red.png')}
                                />
                            ) : (
                                <Image
                                    style={{width: 40, height: 40, opacity: 1}}
                                    source={require('../../../../assets/heart_black.png')}
                                />
                            )}
                        </Pressable>
                    </View>
                </View>
            </>
        ),
        [avatar, isLiked],
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

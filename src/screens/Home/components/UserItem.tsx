import React, {useCallback} from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TUser} from '../../../app/API';
import {COMMON_STYLES} from '../../../styles';
import {ImagePlaceholder} from './ImagePlaceholder/ImagePlaceholder';

interface IProps {
    item: TUser;
    onRemove?: (id: number) => void;
    onPress?: (id: number) => void;
}

export function UserItem(props: IProps) {
    const {item, onRemove, onPress} = props;
    const {avatar, name, id, age, isLiked} = item;

    const handleRemove = useCallback(() => onRemove?.(item.id), [item, onRemove]);

    const handlePress = useCallback(() => onPress?.(id), [id, onPress]);

    const renderIconsContainer = useCallback(
        () => (
            <View>
                <View>
                    {isLiked ? (
                        <Image style={{width: 25, height: 25}} source={require('../../../assets/heart_red.png')} />
                    ) : null}
                </View>
            </View>
        ),
        [isLiked],
    );

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
            <View style={styles.imageContainer}>
                {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : <ImagePlaceholder />}
            </View>
        ),
        [avatar],
    );

    const renderRemoveButton = useCallback(
        () => (
            <TouchableOpacity onPress={handleRemove} style={styles.removeIconWrapper}>
                <Text style={styles.removeIcon}>x</Text>
            </TouchableOpacity>
        ),
        [handleRemove],
    );

    const renderBody = useCallback(() => {
        return (
            <View style={styles.body}>
                {renderImage()}
                {renderIconsContainer()}
                {renderDescription()}
                {renderRemoveButton()}
            </View>
        );
    }, [renderDescription, renderIconsContainer, renderImage, renderRemoveButton]);

    const renderContainer = useCallback(() => {
        return (
            <Pressable onPress={handlePress} style={styles.container}>
                {renderBody()}
            </Pressable>
        );
    }, [renderBody, handlePress]);

    return <View style={styles.root}>{renderContainer()}</View>;
}

const styles = StyleSheet.create({
    root: {
        height: 150,
        width: '100%',
    },
    body: {
        ...COMMON_STYLES.pv_2,
        ...COMMON_STYLES.ph_1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
    },
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 100,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        ...COMMON_STYLES.ml_2,
    },
    removeIcon: {
        fontSize: 24,
    },
    removeIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MediaStream, RTCView } from 'react-native-webrtc'
import Button from './Button'

// Separate Props for ButtonContainer
interface ButtonContainerProps {
    hangup: () => void;
}

// Props for Video
interface Props {
    hangup: () => void;
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
}

function ButtonContainer(props: ButtonContainerProps) {
    return (
        <View style={styles.bContainer}>
            <Button iconName="phone" backgroundColor="red" onPress={props.hangup} />
        </View>
    )
}

export default function Video(props: Props) {
    if (props.localStream && !props.remoteStream) {
        return (
            <View style={styles.container}>
                <RTCView
                    streamURL={props.localStream.toURL()}
                    objectFit={'cover'}
                    style={styles.video}
                />
                <ButtonContainer hangup={props.hangup} />
            </View>
        )
    }

    if (props.localStream && props.remoteStream) {
        return (
            <View style={styles.container}>
                <RTCView
                    streamURL={props.remoteStream.toURL()}
                    objectFit={'cover'}
                    style={styles.video}
                />
                <RTCView
                    streamURL={props.localStream.toURL()}
                    objectFit={'cover'}
                    style={styles.videoLocal}
                />
                <ButtonContainer hangup={props.hangup} />
            </View>
        )
    }

    return <ButtonContainer hangup={props.hangup} />
}

    const styles = StyleSheet.create({
        bContainer:{
            flexDirection: 'row',
            bottom: 30,
        },
        container:{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        video:{
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        videoLocal:{
            position: 'absolute',
            width: 100,
            height: 150,
            top: 0,
            left: 20,
            elevation: 10,
        }

    })
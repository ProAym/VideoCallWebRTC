import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import {MediaStream, RTCView} from 'react-native-webrtc';
import Button from './Button';
import { RTCView } from 'react-native-webrtc';
interface Props{
    hangup: () => void;
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
}
function ButtonContainer(props: Props) {
    return <View style={styles.bContainer}>
        <Button iconName = "phone" backgroundColor='red' onPress={props.hangup} />
    </View>

}

export default function Video(props: Props) {
        //on call we will just desplay the local system
        if(props.localStream && !props.remoteStream){
                return <View style={styles.container}>
                    <RTCView streamURL={props.localStream.toURL()}  objectFit={'cover'}
                    style={styles.video}/>
                </View>
        }
    return <ButtonContainer hangup={props.hangup} localStream={props.localStream} remoteStream={props.remoteStream} />;

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
    }
})
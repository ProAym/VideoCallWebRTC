import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import GettingCall from './components/GettingCall';
import Video from './components/Video';
import {MediaStream, RTCPeerConnection, RTCIceCandidate} from 'react-native-webrtc';
import Utils from './components/Utils';
import firestore, { FirebaseFirestoreTypes, snapshotEqual } from '@react-native-firebase/firestore'

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

export default function App() {
  const  [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const  [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const  [gettingCall, setGettingCall] = useState(false);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);
  
  const setupWebrtc = async () => {
    pc.current  = new RTCPeerConnection(configuration);

    // Get the audio and video stream for the call
    const stream = await Utils.getStream();
    if(stream){
      setLocalStream(stream as MediaStream);
      stream.getTracks().forEach(track => {
        pc.current?.addTrack(track, stream as MediaStream);
      });
    }

    //Get the remote stream once it is available
    (pc.current as any).ontrack = (event: RTCTrackEvent) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };
    
  };
  const create = async () => {
    console.log('Creating call');
    connecting.current = true;
  
    await setupWebrtc();
  
    const cRef = firestore().collection('meet').doc('chatId');
  
    collectIceCandidates(cRef, 'caller', 'callee');
  
    if (pc.current) {
      const offer = await pc.current.createOffer({offerToReceiveVideo: true, offerToReceiveAudio: true});
      await pc.current.setLocalDescription(offer);
  
      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
  
      await cRef.set(cWithOffer); // <--- you forgot this
    }
  };
  
  const join = async () => {}
  const hangup = async () => {}

//helper function 
const collectIceCandidates = async(
  cRef : FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
  localName: string,
  remoteName: string,
) => {
  const candidateCollection =  cRef.collection(localName);

  if(pc.current){
    //on new ICE candidate  add it to firestore 
    pc.current.onicecandidate =(event) =>{
      if(event.candidate){
        candidateCollection.add(event.candidate);
      }
    };
  }

  //Get the iCE candidate added to firestore  and update the local PC
  cRef.collection(remoteName).onSnapshot(snapshot =>{
    snapshot.docChanges().forEach((change: any) =>{
      if(change.type == 'added'){
        const candidate = new RTCIceCandidate(change.doc.data())
          pc.current?.addIceCandidate(candidate);
      }
    })
  })

};


  //Displays the gettingcall component
  if(gettingCall){
    return <GettingCall  hangup ={hangup} join = {join}/>;
  }

  //Displays local stream on calling
  //Displays both local and rempte stream  once call is connected

  if(localStream){
    return (
      <Video 
        hangup = {hangup}
        localStream = {localStream}
        remoteStream = {remoteStream}
        />
    );

  }

  //displays  the call button
  return (
    <View style={styles.container}>
      <Button iconName = 'video' backgroundColor= 'grey' onPress={create}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

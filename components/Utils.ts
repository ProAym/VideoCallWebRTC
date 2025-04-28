import { mediaDevices, MediaStream } from 'react-native-webrtc';

export default class Utils {
  static async getStream(): Promise<MediaStream | null> {
    try {
      let isFront = true;

      const sourceInfos = await mediaDevices.enumerateDevices();
      console.log('Devices found:', sourceInfos);

      let videoSourceId: string | undefined;
    for (let i = 0; i < (sourceInfos as any[]).length; i++) {
        const sourceInfo = (sourceInfos as any[])[i];
        if (sourceInfo.kind === 'videoinput' && sourceInfo.facing === (isFront ? 'front' : 'environment')) {
            videoSourceId = sourceInfo.deviceId;
            break;
        }
    }

    const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
            width: 640,
            height: 480,
            frameRate: 30,
            facingMode: isFront ? 'user' : 'environment',
        },
    });

      return stream;
    } catch (error) {
      console.error('Error getting media stream:', error);
      return null;
    }
  }
}

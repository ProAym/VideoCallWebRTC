# 📞 CallWebRTC - Real-Time Video & Voice Calling App

## Overview
**CallWebRTC** is a cross-platform mobile application built with **React Native** and **WebRTC**, enabling high-quality **real-time video and voice calls**.  
This module is designed as a core feature of the larger **Mektup.co communication platform**, blending seamless communication with future-ready AI-powered experiences.

---

## 🔑 Key Features

- 🔗 **WebRTC-based video & voice calls**
- 💬 Support for 1:1 video and audio calls
- 📱 Built with **React Native**, runs on both Android & iOS
- 🔒 Secure peer-to-peer connection (ICE, STUN/TURN support)
- ⚡ Clean and modern UI (WhatsApp-like design but with our touch)
- 🔥 Modular architecture for easy integration into other apps (like Mektup.co)

---

## 🚀 Tech Stack

- **Frontend:** React Native (with Hooks & Context API)
- **Communication:** WebRTC, react-native-webrtc
- **Signaling Server:** Node.js, Express.js, Socket.IO (separate repo)
- **Deployment Ready For:** Firebase, AWS, or custom infrastructure

---

## 🛠 Project Structure

/CallWebRTC
├── /src
│ ├── /components # UI components
│ ├── /screens # App screens (Call, Home, etc.)
│ ├── /services # WebRTC & signaling logic
│ └── /utils # Helpers and utilities
├── App.js
└── README.md


---

## 💡 How It Works

1. Users initiate or receive calls using a **signaling server (Socket.IO)**.
2. **WebRTC peers negotiate directly via ICE/STUN/TURN servers**.
3. **Media streams are rendered in React Native views**, enabling seamless audio and video communication.
4. Future-ready to integrate **AI assistants, voice message translation, and sign language support**.

---

## ✅ Future Improvements (Part of Mektup.co)

- 🧠 AI-based sign language interpretation during video calls.
- 🌍 Voice message translation keeping the original tone and vibe.
- 🤖 MIA assistant integration for call automation, translations, and smart replies.
- 📡 Group video call support.

---



---


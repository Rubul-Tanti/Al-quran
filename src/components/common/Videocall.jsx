import React, { useState, useRef, useEffect } from "react";
import { FiVideo, FiVideoOff, FiMic, FiMicOff, FiMonitor, FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { MdCallEnd } from "react-icons/md";
import { toast } from "react-toastify";
import { createLocalVideoTrack, Room } from "livekit-client";
import api from "../../utils/axios";

const Videocall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [screenShare, setShareScreen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [room, setRoom] = useState(null);

  const roomName = "abc";
  const identityRef = useRef(Math.random().toString(36).substring(7));
  const identity = identityRef.current;

  // Connect to LiveKit
  useEffect(() => {
    let lkRoom;
    const connectToRoom = async () => {
      try {
        setConnectionStatus("Connecting...");
        console.log("Requesting token for room:", roomName, "identity:", identity);
        
        const res = await api.post(`/v1/livekit/token`, { identity, roomName });
        const { token, url } = res.data;
        
        console.log("Token received, connecting to:", url);

        lkRoom = new Room({
          adaptiveStream: true,
          dynacast: true,
          autoSubscribe: true,
          publishDefaults: {
            videoSimulcastLayers: [
              { resolution: { width: 1280, height: 720 }, encoding: { maxBitrate: 1000000 } },
              { resolution: { width: 640, height: 360 }, encoding: { maxBitrate: 300000 } },
            ],
          },
        });

        await lkRoom.connect(url, token);
        setRoom(lkRoom);
        setConnectionStatus("Connected");
        console.log("Connected to room successfully");

        // Enable local tracks with better error handling
        try {
          console.log("Enabling camera...");
          await lkRoom.localParticipant.setCameraEnabled(true);
          
          console.log("Enabling microphone...");
          await lkRoom.localParticipant.setMicrophoneEnabled(true);
          
          console.log("Local tracks published successfully");
          
          // Attach local video
          const videoTrack = Array.from(lkRoom.localParticipant.videoTracks.values())[0]?.track;
          if (videoTrack && localVideoRef.current) {
            videoTrack.attach(localVideoRef.current);
          }
        } catch (trackError) {
          console.error("Error publishing local tracks:", trackError);
          toast.warning("Could not enable camera/microphone. Check permissions.");
          // Continue anyway - you can still receive video
        }

        // Handle remote participants dynamically
        const addParticipantVideo = (participant) => {
          console.log("Participant joined:", participant.identity);

          // Handle track subscription events
          participant.on("trackSubscribed", (track, publication, participant) => {
            console.log("Track subscribed:", track.kind, "from", participant.identity);
            
            if (track.kind === "video") {
              const videoEl = document.createElement("video");
              videoEl.autoplay = true;
              videoEl.playsInline = true;
              videoEl.muted = true; // Mute remote video to prevent echo
              videoEl.style.width = "100%";
              videoEl.style.height = "100%";
              videoEl.style.objectFit = "cover";
              videoEl.id = `video-${participant.identity}`;
              
              track.attach(videoEl);
              
              if (remoteVideoRef.current) {
                // Remove any existing video for this participant
                const existing = document.getElementById(`video-${participant.identity}`);
                if (existing) {
                  existing.remove();
                }
                remoteVideoRef.current.appendChild(videoEl);
              }
            } else if (track.kind === "audio") {
              console.log("Audio track subscribed from", participant.identity);
              const audioEl = document.createElement("audio");
              audioEl.autoplay = true;
              track.attach(audioEl);
              if (remoteVideoRef.current) {
                remoteVideoRef.current.appendChild(audioEl);
              }
            }
          });

          // Handle tracks being unsubscribed
          participant.on("trackUnsubscribed", (track, publication, participant) => {
            console.log("Track unsubscribed:", track.kind, "from", participant.identity);
            const videoEl = document.getElementById(`video-${participant.identity}`);
            if (videoEl) {
              videoEl.remove();
            }
          });

          // Check for already published tracks when participant joins
          participant.trackPublications.forEach((publication) => {
            console.log("Existing publication:", publication.kind, "subscribed:", publication.isSubscribed);
            if (publication.isSubscribed && publication.track) {
              if (publication.track.kind === "video") {
                const videoEl = document.createElement("video");
                videoEl.autoplay = true;
                videoEl.playsInline = true;
                videoEl.muted = true;
                videoEl.style.width = "100%";
                videoEl.style.height = "100%";
                videoEl.style.objectFit = "cover";
                videoEl.id = `video-${participant.identity}`;
                
                publication.track.attach(videoEl);
                
                if (remoteVideoRef.current) {
                  remoteVideoRef.current.appendChild(videoEl);
                }
              } else if (publication.track.kind === "audio") {
                const audioEl = document.createElement("audio");
                audioEl.autoplay = true;
                publication.track.attach(audioEl);
                if (remoteVideoRef.current) {
                  remoteVideoRef.current.appendChild(audioEl);
                }
              }
            }
          });
        };

        // Existing participants
        console.log("Remote participants:", lkRoom.remoteParticipants.size);
        lkRoom.remoteParticipants.forEach(addParticipantVideo);

        // New participants
        lkRoom.on("participantConnected", addParticipantVideo);

        // Handle participant disconnection
        lkRoom.on("participantDisconnected", (participant) => {
          console.log("Participant disconnected:", participant.identity);
          const videoEl = document.getElementById(`video-${participant.identity}`);
          if (videoEl) {
            videoEl.remove();
          }
        });

        // Disconnection
        lkRoom.on("disconnected", () => {
          console.log("Disconnected from room");
          setConnectionStatus("Disconnected");
        });
      } catch (err) {
        console.error("Error connecting to LiveKit:", err);
        setConnectionStatus("Connection Failed");
        toast.error("Failed to connect to video call");
      }
    };

    connectToRoom();

    return () => {
      if (lkRoom) {
        console.log("Cleaning up and disconnecting");
        lkRoom.disconnect();
      }
    };
  }, []);

  // Mic toggle
  const toggleMic = async () => {
    if (!room) return;
    
    try {
      if (micOn) {
        await room.localParticipant.setMicrophoneEnabled(false);
        setMicOn(false);
        toast.info("Microphone muted");
      } else {
        await room.localParticipant.setMicrophoneEnabled(true);
        setMicOn(true);
        toast.info("Microphone unmuted");
      }
    } catch (err) {
      console.error("Error toggling microphone:", err);
      toast.error("Failed to toggle microphone");
    }
  };

  // Camera toggle
  const toggleCamera = async () => {
    if (!room) return;
    
    try {
      if (cameraOn) {
        await room.localParticipant.setCameraEnabled(false);
        setCameraOn(false);
        toast.info("Camera turned off");
      } else {
        await room.localParticipant.setCameraEnabled(true);
        setCameraOn(true);
        toast.info("Camera turned on");
      }
    } catch (err) {
      console.error("Error toggling camera:", err);
      toast.error("Failed to toggle camera");
    }
  };

  // Screen share
  const toggleScreenShare = async () => {
    if (!room) return;
    
    try {
      if (!screenShare) {
        await room.localParticipant.setScreenShareEnabled(true);
        setShareScreen(true);
        toast.success("Screen sharing started");
      } else {
        await room.localParticipant.setScreenShareEnabled(false);
        setShareScreen(false);
        toast.success("Screen sharing stopped");
      }
    } catch (err) {
      console.error("Error toggling screen share:", err);
      toast.error("Failed to toggle screen share: " + err.message);
    }
  };

  // End call
  const endCall = () => {
    if (room) {
      room.disconnect();
      setConnectionStatus("Call Ended");
      toast.info("Call ended");
    }
  };

  // Send chat message
  const sendMessage = () => {
    if (!message.trim() || !room) return;
    const newMessage = {
      text: message,
      sender: identity,
      timestamp: new Date().toLocaleTimeString(),
    };
    const encoder = new TextEncoder();
    room.localParticipant.publishData(encoder.encode(JSON.stringify(newMessage)), { reliable: true });
    setChatMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  // Receive chat messages
  useEffect(() => {
    if (!room) return;
    
    const handleDataReceived = (payload, participant) => {
      try {
        const decoder = new TextDecoder();
        const messageData = JSON.parse(decoder.decode(payload));
        console.log("Message received from:", participant?.identity);
        setChatMessages((prev) => [...prev, messageData]);
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };
    
    room.on("dataReceived", handleDataReceived);
    
    return () => {
      room.off("dataReceived", handleDataReceived);
    };
  }, [room]);

  return (
<div className="flex flex-col md:flex-row h-screen items-center">
  {/* Main video + participants */}
  <div className="bg-blue-50 p-3 md:p-5 flex flex-col md:flex-row gap-5 w-full md:w-[80%] h-[80vh] md:h-screen">
    
    {/* Video Section */}
    <div className="relative w-full md:w-5/6 h-[50vh] md:h-full">
      {/* Connection status */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded z-50 text-xs sm:text-sm">
        {connectionStatus}
      </div>

      {/* Controls */}
      <div className="absolute bg-zinc-950 p-3 sm:p-4 flex flex-row flex-wrap justify-center gap-3 rounded-full bottom-5 left-1/2 -translate-x-1/2 z-50">
        {micOn ? (
          <FiMic
            size={22}
            onClick={toggleMic}
            className="text-white cursor-pointer bg-zinc-800 h-9 w-9 rounded-full p-2"
          />
        ) : (
          <FiMicOff
            size={22}
            onClick={toggleMic}
            className="text-white cursor-pointer bg-red-600 h-9 w-9 rounded-full p-2"
          />
        )}
        {cameraOn ? (
          <FiVideo
            onClick={toggleCamera}
            size={22}
            className="text-white cursor-pointer bg-zinc-800 h-9 w-9 rounded-full p-2"
          />
        ) : (
          <FiVideoOff
            onClick={toggleCamera}
            size={22}
            className="text-white cursor-pointer bg-red-600 h-9 w-9 rounded-full p-2"
          />
        )}
        <FiMonitor
          onClick={toggleScreenShare}
          size={22}
          className={`text-white cursor-pointer h-9 w-9 rounded-full p-2 ${
            screenShare ? "bg-blue-600" : "bg-zinc-800"
          }`}
        />
        <GrEmoji
          size={22}
          className="text-white bg-zinc-800 h-9 w-9 rounded-full p-2"
        />
        <MdCallEnd
          onClick={endCall}
          size={22}
          className="text-white cursor-pointer bg-red-800 h-9 w-9 rounded-full p-2"
        />
      </div>

      {/* Remote video */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-full rounded-xl border bg-gray-200 object-cover"
      />
    </div>

    {/* Side participants */}
    <div className="flex flex-row md:flex-col gap-3 justify-center md:justify-start items-center md:items-start w-full md:w-auto">
      {/* Local video */}
      <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl bg-gray-200 relative overflow-hidden">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-[10px] sm:text-xs">
          You {!cameraOn && "(Camera Off)"}
        </div>
      </div>

      {/* Placeholder */}
      <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl bg-blue-200 flex items-center justify-center">
        <span className="text-gray-600 text-xs sm:text-sm">
          No additional users
        </span>
      </div>
    </div>
  </div>

  {/* Chat panel */}
  <div className="w-full md:w-[20%] h-[40vh] md:h-[70vh] mt-3 md:mt-0 relative overflow-hidden bg-blue-100 rounded-2xl flex flex-col">
    <div className="h-10 sm:h-12 text-center pt-2 text-white bg-blue-300 font-bold text-sm sm:text-base">
      In Call Chat
    </div>

    {/* Messages */}
    <div className="flex-1 p-3 overflow-y-auto text-sm">
      {chatMessages.map((msg, index) => (
        <div key={index} className="mb-2">
          <div className="text-xs text-gray-600">{msg.sender}</div>
          <div className="bg-white p-2 rounded-lg">{msg.text}</div>
          <div className="text-xs text-gray-500">{msg.timestamp}</div>
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="p-3 flex items-center gap-2">
      <input
        className="flex-1 outline-0 border border-blue-300 p-2 rounded-full text-sm"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>
        <FiSend className="bg-blue-700 text-white h-8 w-8 p-2 rounded-lg cursor-pointer" />
      </button>
    </div>
  </div>
</div>
  );
};

export default Videocall;

import React, { useState } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Button } from "./Button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  videoSrc?: string;
  title?: string;
  studentName?: string;
  programTitle?: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">
          {title && <h3 className="video-modal-title">{title}</h3>}
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="video-container">
          <video
            src={videoUrl}
            className="video-player"
            controls
            autoPlay
            muted={isMuted}
          />
        </div>

        <div className="video-controls">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
          
          <Button variant="ghost" size="icon-sm">
            <Maximize size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;

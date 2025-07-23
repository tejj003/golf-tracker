import { useState, useCallback, useRef } from 'react';

export const useCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
          facingMode: 'environment' // Use back camera on mobile
        },
        audio: false
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown camera error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setStream(null);
    }
  }, []);

  const switchCamera = useCallback(async (facingMode: 'user' | 'environment') => {
    if (streamRef.current) {
      stopCamera();
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
          facingMode
        },
        audio: false
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Camera switch failed';
      setError(errorMessage);
      throw err;
    }
  }, [stopCamera]);

  return {
    stream,
    isLoading,
    error,
    startCamera,
    stopCamera,
    switchCamera
  };
};

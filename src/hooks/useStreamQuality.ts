import { useState, useEffect, useCallback } from 'react';

interface StreamMetrics {
  bitrate: number;
  fps: number;
  latency: number;
  bufferingEvents: number;
  qualityChanges: number;
  peakViewers: number;
  duration: number;
}

interface StreamQualityOptions {
  updateInterval?: number;
  minBitrate?: number;
  targetFps?: number;
}

export const useStreamQuality = (options: StreamQualityOptions = {}) => {
  const {
    updateInterval = 1000,
    minBitrate = 1500,
    targetFps = 30,
  } = options;

  const [metrics, setMetrics] = useState<StreamMetrics>({
    bitrate: 0,
    fps: 0,
    latency: 0,
    bufferingEvents: 0,
    qualityChanges: 0,
    peakViewers: 0,
    duration: 0,
  });

  const [startTime] = useState(Date.now());

  const updateMetrics = useCallback(() => {
    // Since we can't access the iframe content directly due to CORS,
    // we'll estimate metrics based on the iframe's presence and visibility
    const iframe = document.querySelector('iframe');
    
    if (iframe) {
      const isVisible = !(iframe.classList.contains('hidden'));
      const newMetrics = {
        ...metrics,
        bitrate: isVisible ? minBitrate : 0,
        fps: isVisible ? targetFps : 0,
        latency: isVisible ? 0 : 1000,
        bufferingEvents: isVisible ? metrics.bufferingEvents : metrics.bufferingEvents + 1,
        qualityChanges: metrics.qualityChanges,
        peakViewers: Math.max(metrics.peakViewers, isVisible ? 1 : 0),
        duration: Math.floor((Date.now() - startTime) / 1000),
      };

      setMetrics(newMetrics);
    }
  }, [metrics, startTime, minBitrate, targetFps]);

  useEffect(() => {
    const interval = setInterval(updateMetrics, updateInterval);
    return () => clearInterval(interval);
  }, [updateMetrics, updateInterval]);

  const getQualityScore = useCallback(() => {
    const bitrateScore = metrics.bitrate / minBitrate;
    const fpsScore = metrics.fps / targetFps;
    const latencyScore = Math.max(0, 1 - metrics.latency / 5);
    
    return (bitrateScore + fpsScore + latencyScore) / 3;
  }, [metrics, minBitrate, targetFps]);

  return {
    metrics,
    qualityScore: getQualityScore(),
    updateMetrics,
  };
};

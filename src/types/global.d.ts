declare module 'zustand' {
  import { StateCreator } from 'zustand/vanilla';
  export declare const create: <T>(stateCreator: StateCreator<T>) => import('zustand').UseBoundStore<T>;
}

declare module 'zustand/middleware' {
  import { StateCreator, StoreApi } from 'zustand/vanilla';

  export interface PersistOptions<S, PersistedState = S> {
    name: string;
    storage?: StateStorage;
    partialize?: (state: S) => PersistedState;
    version?: number;
    migrate?: (persistedState: any, version: number) => S | Promise<S>;
    merge?: (persistedState: any, currentState: S) => S;
    onRehydrateStorage?: (state: S) => ((state?: S, error?: Error) => void) | void;
  }

  export interface StateStorage {
    getItem: (name: string) => string | null | Promise<string | null>;
    setItem: (name: string, value: string) => void | Promise<void>;
    removeItem: (name: string) => void | Promise<void>;
  }

  export type PersistImpl = <S>(
    config: StateCreator<S>,
    options: PersistOptions<S>
  ) => StateCreator<S>;

  export declare const persist: PersistImpl;
  export declare const createJSONStorage: () => StateStorage;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

import { Database as SupabaseDatabase } from './supabase';

declare global {
  type Database = SupabaseDatabase;

  interface StreamMetrics {
    bitrate: number;
    fps: number;
    latency: number;
    duration: number;
    peakViewers: number;
    qualityChanges: number;
    bufferingEvents: number;
  }

  interface StreamQualityOptions {
    updateInterval: number;
    minBitrate: number;
    targetBitrate: number;
    minFps: number;
    targetFps: number;
  }

  interface ChatMessage {
    id: string;
    content: string;
    userId: string;
    username: string;
    timestamp: string;
  }

  interface User {
    id: string;
    email: string;
    username: string;
    avatarUrl?: string;
    role: 'user' | 'admin' | 'moderator';
    createdAt: string;
    updatedAt: string;
  }

  interface Stream {
    id: string;
    title: string;
    description?: string;
    userId: string;
    status: 'live' | 'offline';
    startedAt?: string;
    endedAt?: string;
    viewerCount: number;
    peakViewerCount: number;
    quality: string;
    thumbnailUrl?: string;
  }

  interface ApiResponse<T> {
    data: T | null;
    error: {
      code: string;
      message: string;
    } | null;
  }
}

export {};

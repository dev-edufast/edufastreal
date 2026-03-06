import { useState, useCallback } from "react";

interface GoogleDriveAccessState {
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
}

interface AccessOptions {
  courseTitle?: string;
  linkType?: string;
}

export function useGoogleDriveAccess() {
  const [state, setState] = useState<GoogleDriveAccessState>({
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      // Mock Google Drive connection - replace with actual OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState({
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: err instanceof Error ? err : new Error("Failed to connect to Google Drive"),
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  }, []);

  // Handle Google Drive access with link and options
  const handleGoogleDriveAccess = useCallback(async (link: string, options?: AccessOptions) => {
    // Open the Google Drive link in a new tab
    window.open(link, '_blank');
    console.log('Accessing Google Drive:', link, options);
  }, []);

  return {
    ...state,
    connect,
    disconnect,
    handleGoogleDriveAccess,
  };
}

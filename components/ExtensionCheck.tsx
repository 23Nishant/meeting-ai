'use client';

import { useEffect } from 'react';

export function ExtensionCheck({ onExtensionStatus }: { onExtensionStatus: (status: boolean) => void }) {
  useEffect(() => {
    const checkExtension = () => {
      const extensionId = process.env.NEXT_PUBLIC_EXTENSION_ID;
      if (chrome?.runtime?.sendMessage) {
        chrome.runtime.sendMessage(
          extensionId,
          { type: 'CHECK_HOLOGRAM' },
          (response) => {
            onExtensionStatus(!!response?.active);
          }
        );
      } else {
        onExtensionStatus(false);
      }
    };

    checkExtension();
    const interval = setInterval(checkExtension, 5000);
    return () => clearInterval(interval);
  }, [onExtensionStatus]);

  return null;
}

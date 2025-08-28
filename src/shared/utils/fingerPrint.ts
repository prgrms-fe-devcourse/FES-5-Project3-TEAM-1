const hashString = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export const generateSimpleFingerprint = async (): Promise<string> => {
  const simpleData = {
    ua: navigator.userAgent,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
    concurrency: navigator.hardwareConcurrency,
    memory: (navigator as any).deviceMemory || 0,
    touch: 'ontouchstart' in window,
    timestamp: Math.floor(Date.now() / (1000 * 60)),
  };

  return await hashString(JSON.stringify(simpleData));
};

export const trpc = {
  sensors: {
    getLatest: {
      async query(input: { deviceId: string }) {
        try {
          const url = `/api/sensors/latest?deviceId=${encodeURIComponent(input.deviceId)}`;
          const res = await fetch(url);
          if (!res.ok) return null;
          return await res.json();
        } catch (e) {
          return null;
        }
      },
    },
  },
};

export default trpc;

export const compositeStyle = {
  centerBoth: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  absoluteCenterBoth: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
} as const;

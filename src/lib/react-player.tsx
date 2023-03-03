import ReactPlayer from 'react-player/lazy';

import type { ReactPlayerProps, Config } from 'react-player/lazy';

export const ReactPlayerLazy = (props: ReactPlayerProps) => {
  const defaultConfig: Config = {
    file: {
      attributes: {
        poster: props.light,
      },
    },
  };

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        {...props}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '0.375rem',
          overflow: 'hidden',
          ...props.style,
        }}
        config={{ ...defaultConfig, ...props.config }}
      />
    </div>
  );
};

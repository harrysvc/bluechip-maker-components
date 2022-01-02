import React, { useEffect, useRef } from 'react';

const useSkipFirstRunEffect = (cb: React.EffectCallback, deps: React.DependencyList) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    cb();
  }, deps);
};

export default useSkipFirstRunEffect;

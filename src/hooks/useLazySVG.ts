import { useState, useEffect } from "react";

export function useLazySVG(relativePath: string) {
  const [Icon, setIcon] = useState<React.FC | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fullPath = `/src/${relativePath}`;

    import(/* @vite-ignore */ `${fullPath}`)
      .then((module) => {
        if (isMounted) {
          setIcon(() => module.default || module.ReactComponent);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIcon(() => () => null);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [relativePath]);
  return Icon;
}

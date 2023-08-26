import { useEffect } from "react";

// @ts-ignore
import { Fancybox as BaseFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const Fancybox = (props: any) => {
  const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    const opts = props.options || {};

    BaseFancybox.bind(delegate, opts);

    return () => {
      BaseFancybox.destroy();
    };
  }, []);

  return <>{props.children}</>;
};

export default Fancybox;

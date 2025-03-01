import { PortableTextReactComponents, PortableTextComponentProps } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

export const richText: Partial<PortableTextReactComponents> = {
  block: {
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-lg font-bold mt-6">{children}</h3>
    ),
  },
};
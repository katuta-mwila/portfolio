import { ComponentType } from "react";

type QuickMapProps<T extends object> = {
  objects: T[];
  componentTag: ComponentType<T>;
};

export default function QuickMap<T extends object>({objects, componentTag: ComponentTag}: QuickMapProps<T>) {
  return objects.map((obj, i) => (
    <ComponentTag key={i} {...obj} />
  ));
}
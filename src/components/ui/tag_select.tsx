
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem
} from "./multi_select";

interface Tag {
  id: string;
  label: string;
}

interface TagSelectProps {
  selected: string[];
  options: Tag[];
  onChange: (value: string[]) => void;
  showLabels?: boolean;
}

export function TagSelect({ selected, options, onChange, showLabels = true }: TagSelectProps) {
  const getLabel = (id: string) => {
    return options.find(tag => tag.id === id)?.label || id;
  };

  return (
    <MultiSelector
      values={showLabels ? selected.map(getLabel) : selected}
      onValuesChange={(newValues) => {
        // Convertir les labels en IDs pour la BD
        const newIds = newValues.map(value => {
          if (showLabels) {
            const tag = options.find(t => t.label === value);
            return tag?.id || value;
          }
          return value;
        });
        onChange(newIds);
      }}
      loop
      className="w-full"
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select tags for your idea" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((tag) => (
            <MultiSelectorItem
              key={tag.id}
              value={showLabels ? tag.label : tag.id}
            >
              {tag.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
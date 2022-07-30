import { Text, Button, IButtonProps } from "native-base";

interface Props extends IButtonProps {
  title: string;
  type: "open" | "closed" | "all";
  isActive?: boolean;
  colorType: string;
}

export function Filter({
  title,
  type,
  isActive = false,
  colorType,
  ...rest
}: Props) {
  return (
    <Button
      variant="outline"
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      bgColor="gray.600"
      size="sm"
      {...rest}
    >
      <Text
        color={isActive ? colorType : "gray.300"}
        fontSize="xs"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  );
}

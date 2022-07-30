import { Button as ButtonNativeBase, IButtonProps, Heading } from "native-base";

interface Props extends IButtonProps {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      bgColor="green.500"
      h={14}
      rounded="lg"
      _pressed={{
        bg: "primary.700",
      }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}

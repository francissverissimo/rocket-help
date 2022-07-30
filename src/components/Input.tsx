import { IInputProps, Input as NativeBaseInput } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      height={14}
      size="md"
      borderWidth={1}
      borderColor="gray.500"
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      selectionColor="secondary.700"
      backgroundColor="gray.700"
      rounded="lg"
      _focus={{ borderWidth: 1, borderColor: "primary.700" }}
      {...rest}
    />
  );
}

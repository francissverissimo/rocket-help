import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from "native-base";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Loading } from "../components/Loading";
import { dateFormat } from "../utils/firestoreDateFormat";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import Logo from "../assets/logo_secondary.svg";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<
    "open" | "closed" | "all"
  >("all");

  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        Alert.alert("Sair", "Não foi possível sair.");
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const subscriber = () => {
      statusSelected === "all" &&
        firestore()
          .collection("orders")
          .onSnapshot((snapshot) => {
            if (snapshot) {
              const data = snapshot.docs.map((doc) => {
                const { patrimony, description, status, createdAt } =
                  doc.data();

                return {
                  id: doc.id,
                  patrimony,
                  description,
                  status,
                  when: dateFormat(createdAt),
                };
              });

              setOrders(data);
            }
            setIsLoading(false);
          });

      statusSelected !== "all" &&
        firestore()
          .collection("orders")
          .where("status", "==", statusSelected)
          .onSnapshot((snapshot) => {
            if (snapshot) {
              const data = snapshot.docs.map((doc) => {
                const { patrimony, description, status, createdAt } =
                  doc.data();

                return {
                  id: doc.id,
                  patrimony,
                  description,
                  status,
                  when: dateFormat(createdAt),
                };
              });

              setOrders(data);
            }
            setIsLoading(false);
          });
    };

    return subscriber();
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={5}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.red[700]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={5}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack mb={6} justifyContent="space-between">
          <Filter
            title="todos"
            type="all"
            onPress={() => setStatusSelected("all")}
            isActive={statusSelected === "all"}
            colorType={colors.white}
            width="20%"
          />

          <Filter
            title="em andamento"
            type="open"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
            colorType={colors.secondary[700]}
            width="36%"
          />

          <Filter
            title="finalizados"
            type="closed"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
            colorType={colors.primary[700]}
            width="36%"
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {"\n"} solicitações
                  {statusSelected === "open" ? " em andamento" : " finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}
        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}

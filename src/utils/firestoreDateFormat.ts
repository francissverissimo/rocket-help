import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    const dayMouthYear = date.toLocaleDateString("pt-BR");
    const hour = date.toLocaleTimeString("pt-BR");

    return `${dayMouthYear} às ${hour}`;
  }
}

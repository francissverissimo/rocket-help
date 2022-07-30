import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface OrderFirestoreDTO {
  patrimony: string;
  description: string;
  status: "open" | "closed";
  createdAt: FirebaseFirestoreTypes.Timestamp;
  solution?: string;
  closedAt?: FirebaseFirestoreTypes.Timestamp;
}

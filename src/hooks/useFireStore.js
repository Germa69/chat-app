import { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

const useFireStore = (collectionName, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef;

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }

            collectionRef = query(
                collection(db, collectionName),
                where(
                    condition.fieldName,
                    condition.operator,
                    condition.compareValue
                ),
                orderBy("createdAt")
            );
        }

        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            // Data after converting from 1 docs of firebase to normal data type JS
            // console.log({ documents, snapshot, docs: snapshot.docs });
            setDocuments(documents);
        });

        // Clear function
        return unsubscribe;
    }, [collectionName, condition]);

    return documents;
};

export default useFireStore;

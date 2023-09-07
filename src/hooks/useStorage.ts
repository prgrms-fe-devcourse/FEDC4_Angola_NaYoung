import { useState } from 'react';

interface StorageProps<T> {
	storage: Storage;
	key: string;
	initialValue: T;
}

const useStorage = <T>({ storage, key, initialValue }: StorageProps<T>) => {
	const [storedItem, setStoredItem] = useState<T>(() => {
		const item = storage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	});

	const setItem = (value: T) => {
		setStoredItem(value);
		storage.setItem(key, JSON.stringify(value));
	};

	return [storedItem, setItem] as const;
};

export default useStorage;

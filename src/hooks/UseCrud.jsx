import { useDispatch, useSelector } from 'react-redux';

export const UseCrud = ({ selector, setAction, persistFn }) => {
	const dispatch = useDispatch();
	const data = useSelector(selector);

	const sync = async (newData) => {
		dispatch(setAction(newData));
		if (persistFn) await persistFn(newData);
	};

	const create = async (item) => {
		const newData = [...data, item];
		await sync(newData);
	};

	const read = () => {
		return data;
	};

	const update = async (id, updatedData) => {
		const newData = data.map((item) =>
			item.id === id ? updatedData : item
		);
		await sync(newData);
	};

	const deleted = async (id) => {
		const newData = data.filter((item) => item.id !== id);
		await sync(newData);
	};

	return {
		create,
		read,
		update,
		deleted,
	};
};

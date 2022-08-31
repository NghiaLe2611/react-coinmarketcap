import { useState, useMemo } from 'react';

export const useSortableData = (items, config = null) => {
	const [sortConfig, setSortConfig] = useState(config);

	const sortedItems = useMemo(() => {
		let sortableItems = [...items];
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableItems;
	}, [items, sortConfig]);

	const requestSort = (key) => {
		let direction = 'ascending';
		if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	return { items: sortedItems, requestSort, sortConfig };
};

// https://codesandbox.io/embed/table-sorting-example-ur2z9?fontsize=14&hidenavigation=1&theme=dark

// const sortedItems = useMemo(() => {
//     let sortableItems = [...items];
//     if (sortConfig !== null) {
//         if (sortConfig.direction === '') return sortableItems; // return default order
//         sortableItems.sort((a, b) => {
//             if (a[sortConfig.key] < b[sortConfig.key]) {
//                 return sortConfig.direction === 'ascending' ? -1 : 1;
//             }
//             if (a[sortConfig.key] > b[sortConfig.key]) {
//                 return sortConfig.direction === 'ascending' ? 1 : -1;
//             }

//             return 0;
//         });
//     }

//     return sortableItems;
// }, [items, sortConfig]);

// const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig && sortConfig.key === key) {
//         switch (sortConfig.direction) {
//             case 'ascending': {
//                 direction = 'descending';
//                 break;
//             }
//             case 'descending': {
//                 direction = '';
//                 break;
//             }
//             case '': {
//                 direction = 'ascending';
//                 break;
//             }
//             default:
//                 return;
//         }
//     }

//     setSortConfig({ key, direction });
// };

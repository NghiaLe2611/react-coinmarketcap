import { useState, useMemo } from 'react';

function getNestedKeyObj(o, s) {
	s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	s = s.replace(/^\./, ''); // strip a leading dot
	var a = s.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i];
		if (k in o) {
			o = o[k];
		} else {
			return;
		}
	}
	return o;
}

// function getNestedKeyObj (obj, key) {
// 	const keys = key.split('.');
// 	let value = obj;
// 	for (let i = 0; i < keys.length; i++) {
// 		value = value[keys[i]];
// 		if (!value) {
// 			break;
// 		}
// 	}
// 	return value;
// };

export const useSortableData = (items, config = null) => {
	const [sortConfig, setSortConfig] = useState(config);

	const sortedItems = useMemo(() => {
		let sortableItems = [...items];
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				// Nested key
				if (sortConfig.key.includes('.')) {
					if (getNestedKeyObj(a, sortConfig.key) < getNestedKeyObj(b, sortConfig.key)) {
						return sortConfig.direction === 'ascending' ? -1 : 1;
					}
					if (getNestedKeyObj(a, sortConfig.key) > getNestedKeyObj(b, sortConfig.key)) {
						return sortConfig.direction === 'ascending' ? 1 : -1;
					}
				}
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


// var sort = function (prop, arr) {
//     prop = prop.split('.');
//     var len = prop.length;
    
//     arr.sort(function (a, b) {
//         var i = 0;
//         while( i < len ) {
//             a = a[prop[i]];
//             b = b[prop[i]];
//             i++;
//         }
//         if (a < b) {
//             return -1;
//         } else if (a > b) {
//             return 1;
//         } else {
//             return 0;
//         }
//     });
//     return arr;
// };
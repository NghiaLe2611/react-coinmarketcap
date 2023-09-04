import { memo } from 'react';
import { TableCell } from '@mui/material';

// Check re render cell
function checkSortProps(prevProps, nextProps) {
    const prevSort = prevProps.sortConfig;
    const nextSort = nextProps.sortConfig;

    let firstInit = prevProps.name === nextProps.name;
    let condition1 = true;
    let condition2 = true;

    // Add class to recent sort cell
    if (nextSort) {
        if (prevProps.name === nextSort.key) condition1 = false;
    }

    // Remove class of previous sort cell
    if (prevSort) {
        if (prevProps.name === prevSort?.key) condition2 = false;
    }

    return firstInit && condition1 && condition2;
}

const SortTableHead = memo(function SortTableCell(props) {
    const { align, rowSpan, colSpan, name, label, sortConfig, requestSort, style } = props;

    const defaultCell = (
        <TableCell align={align} sx={style} rowSpan={rowSpan} className="sortable-cell" onClick={() => requestSort(name)}>
            <span>{label}</span>
        </TableCell>
    );

    if (sortConfig) {
        if (sortConfig.key === name) {
            if (sortConfig.direction === 'ascending') {
                return (
                    <TableCell
                        align={align}
                        sx={style}
                        rowSpan={rowSpan}
                        colSpan={colSpan}
                        className="sortable-cell ascending"
                        onClick={() => requestSort(name)}
                    >
                        <span>{label}</span>
                    </TableCell>
                );
            }

            if (sortConfig.direction === 'descending') {
                return (
                    <TableCell
                        align={align}
                        sx={style}
                        rowSpan={rowSpan}
                        colSpan={colSpan}
                        className="sortable-cell descending"
                        onClick={() => requestSort(name)}
                    >
                        <span>{label}</span>
                    </TableCell>
                );
            }
        } else {
            return defaultCell;
        }
    }

    return defaultCell;
}, checkSortProps);

export default SortTableHead;

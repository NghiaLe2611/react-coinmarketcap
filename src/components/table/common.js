import { Table, TableBody, TableHead } from '@mui/material';
import { styled, withTheme } from '@mui/styles';

export const CommonTable = styled(withTheme(Table))(({ theme }) => ({
    backgroundColor: 'var(--bg-table)',
    '& .MuiTableRow-root .MuiTableCell-head': {
        borderTop: '1px solid var(--border-table)',
        borderBottom: '1px solid var(--border-table)',
        borderRight: '1px solid var(--border-table)',
        '&[colspan]': {
            borderBottom: '0 !important'
        }
    },
    '& .MuiTableRow-root .MuiTableCell-body': {
        borderBottom: '1px solid var(--border-table)',
        borderRight: '1px solid var(--border-table)',
    },
    '& .MuiTableRow-root .MuiTableCell-head:first-child': {
        borderLeft: '1px solid var(--border-table)'
    },
    '& .MuiTableRow-root .MuiTableCell-body:first-child': {
        borderLeft: '1px solid var(--border-table)'
    }
}));

export const StyledTable = styled(Table)(({ theme }) => ({
    backgroundColor: 'transparent',
    '& .MuiTableCell-root': {
        fontSize: 13,
        fontWeight: 500,
        '&.MuiTableCell-head': {
            fontWeight: 700
        }
    }
}));

export const StyledTableHead = styled(withTheme(TableHead))(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: 99,
    '& .MuiTableRow-root .MuiTableCell-head': {
        backgroundColor: 'var(--bg-table-head)',
        color: 'var(--color-table-head)',
        textTransform: 'uppercase',
        padding: '1px 5px',
        fontSize: 14,
    }
}));

export const StyledTableBody = styled(withTheme(TableBody))(({ theme, fontSize }) => ({
    '& .MuiTableRow-root .MuiTableCell-body': {
        fontWeight: 500,
        fontSize: 13,
        padding: '6px',
        ['@media (max-width: 1500px)']: { // eslint-disable-line no-useless-computed-key
            fontSize: 12,
        }
    },
    '& .MuiTableRow-root:nth-child(even)': {
        backgroundColor: 'var(--bg-row-even)',
    },
    '& .MuiTableRow-root:hover': {
        backgroundColor: 'var(--bg-table-hover)',
        '& .cell-light': {
            backgroundColor: 'var(--bg-table-hover)'
        }
    }
}));
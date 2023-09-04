
import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<LinearProgress />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
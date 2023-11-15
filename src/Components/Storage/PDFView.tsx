import {
    // PDFViewer,
    usePDF,
} from '@react-pdf/renderer';
import PDFDocument from './PDFCreator';
import { useLoaderData } from 'react-router-dom';
import type { orderEditLoader } from '../../Router/loaders';
import { Box } from '@mui/material';
import BackButton from '../BackButton';
import AlertBox from '../AlertBox';

// type (interface) for PDF Loader data
export type PDFOrderType = Awaited<ReturnType<typeof orderEditLoader>>;

/**
 * View for creating PDF document
 */
function PDFView() {
    const loader = useLoaderData() as PDFOrderType;
    //create instance of pdf document so we get the blob for object element
    const [instance] = usePDF({ document: <PDFDocument order={loader} /> });

    return (
        <>
            {loader.status === 'Processing' && <AlertBox text="Tilaus käsittelyssä" status="success" timer={4000} />}
            <Box margin={1}>
                <BackButton />
            </Box>
            {/* object element is better suited for pdf viewing because it doesn't affect browser history like iframe, which PDFViewer uses */}
            {instance.loading ? (
                'Loading document...'
            ) : (
                <object
                    data={instance.url?.toString()}
                    type="application/pdf"
                    style={{ width: '100%', height: '1500px' }}
                    aria-label="pdf"
                />
            )}
            {/* <PDFViewer style={{ width: '100%', height: '1500px' }}>
                <PDFDocument order={loader} />
            </PDFViewer> */}
        </>
    );
}

export default PDFView;

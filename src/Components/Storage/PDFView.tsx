import { PDFViewer, usePDF } from '@react-pdf/renderer';
import { useLoaderData } from 'react-router-dom';
import PDFDocument from './PDFCreator';
import type { orderEditLoader } from '../../Router/loaders';
import BackButton from '../BackButton';

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
            <BackButton />
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

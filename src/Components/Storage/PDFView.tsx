import { PDFViewer } from '@react-pdf/renderer';
import { useLoaderData } from 'react-router-dom';
import PDFDocument from './PDFCreator';
import { type pdfViewLoader } from '../../Router/loaders';

// type (interface) for PDF Loader data
export type PDFOrderType = Awaited<ReturnType<typeof pdfViewLoader>>;

/**
 * View for creating PDF document
 */
function PDFView() {
    const loader = useLoaderData() as PDFOrderType;

    return (
        <PDFViewer style={{ width: '100%', height: '1500px' }}>
            <PDFDocument order={loader} />
        </PDFViewer>
    );
}

export default PDFView;
